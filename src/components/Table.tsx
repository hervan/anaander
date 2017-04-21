import * as React from "react";

import {
    Action,
    begin,
    Game,
    Meeple,
    neighbours,
    Play,
    play,
    Position,
    selectSwarm,
    setup,
    Team,
    tutorial
} from "../Game";

import Board from "./Board";
import Controls from "./Controls";
import Setup from "./Setup";
import Status from "./Status";
import Tutorial, { Lesson } from "./Tutorial";

enum Mode {
    tutorial,
    setup,
    play,
    end
};

export type Control =
    | "setup"
    | "-player"   | "+player"
    | "-computer" | "+computer"
    | "-size"     | "+size"
    | "begin"     | "tutorial";

interface IState {
    game: Game;
    mode: Mode;
    playerCount: number;
    computerCount: number;
    boardSize: number;
    selection: Position[];
    playQueue: Play[][];
    lesson?: Lesson;
};

export interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
    game: Game;
    selection: Position[];
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.refresher = window.setInterval(() => this.dequeue(), 85);

        this.state = {
            game: setup(0),
            mode: Mode.setup,
            playerCount: 1,
            computerCount: 1,
            boardSize: 16,
            selection: [],
            playQueue: [[], [], [], [], []]
        };
    }

    setup(control: Control, lesson: Lesson = { index: 0 }): void {

        switch (control) {

            case "setup":

            this.setState({
                game: setup(2),
                mode: Mode.setup,
                playerCount: 1,
                computerCount: 1,
                boardSize: 16,
                selection: [],
                playQueue: [[], [], [], [], [], []]
            });

            break;

            case "tutorial":

            this.setState({
                game: tutorial(lesson.index),
                selection: [],
                playQueue: [[], [], [], [], [], []],
                lesson: lesson
            });

            break;

            case "begin":

            this.setState({ game: begin(this.state.game) });
            this.autoSelect();

            break;
        }
    }

    enqueuePlay(team: Team, action: Action): void {

        if (this.state.selection.length > 0) {

            const queue: Play[][] = this.state.playQueue;
            queue[team].push({
                team: team,
                action: action,
                from: {
                    selection: "swarm",
                    swarm: this.state.selection[0]
                }
            });
            this.setState({
                playQueue: queue,
                selection: []
            });
        }
    }

    dequeue(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.currentTeam].length > 0) {

            const playData: Play = queue[this.state.game.currentTeam].shift() as Play;
            const gameStep = play(this.state.game, playData);

            this.setState({
                game: gameStep,
                playQueue: queue,
                selection: []
            });

            if (gameStep.currentTeam !== Team.default
                && queue[this.state.game.currentTeam].length === 0) {

                this.autoSelect();
            }
        }
    }

    select(position: Position): void {

        if (this.state.game.currentTeam !== Team.default) {

            this.setState({ selection: selectSwarm(this.state.game, position) });

            // const swarmPositions = selectSwarm(this.state.game, position);

            // if (swarmPositions.length > 0) {

            //     const deSelection = this.state.selection.filter((pos) =>
            //         !swarmPositions.some((p) => p.row === pos.row && p.col === pos.col));

            //     this.setState({ selection:
            //         this.state.selection.some((pos) => pos.row === position.row && pos.col === position.col) ?
            //         deSelection : deSelection.concat(swarmPositions)
            //     });
            // }
        }
    }

    autoSelect(): void {

        const availableMeeples = this.state.game.terrains.filter((terrain) =>
            terrain.topMeeple !== -1
            && this.state.game.meeples[terrain.topMeeple].team === this.state.game.currentTeam
            && this.state.game.meeples[terrain.topMeeple].turn === this.state.game.turn);

        if (availableMeeples.length > 0) {

            this.select(availableMeeples[0].position);

            if (availableMeeples.length !== this.state.selection.length) {

                this.select(availableMeeples[0].position);
            }
        }
    }

    componentWillUnmount(): void {

        window.clearInterval(this.refresher);
    }

    render(): JSX.Element {

        let leftPanel: JSX.Element;

        switch (this.state.mode) {

            case Mode.tutorial:
            leftPanel = <Tutorial
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                lesson={this.state.lesson!} />;
            break;

            case Mode.setup:
            leftPanel = <Setup
                setup={this.setup.bind(this)}
                game={this.state.game} />;
            break;

            default:
            leftPanel = <Status
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                game={this.state.game}
                selection={this.state.selection} />;
        }

        const rightPanel = this.state.mode !== Mode.tutorial ?
            <Controls
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                game={this.state.game}
                selection={this.state.selection} /> :
            null;

        return (
            <section className="section">
                <div className="container is-fluid">
                    <div id="table" className="tile is-ancestor">

                        {leftPanel}

                        <Board
                            setup={this.setup.bind(this)}
                            enqueuePlay={this.enqueuePlay.bind(this)}
                            select={this.select.bind(this)}
                            game={this.state.game}
                            selection={this.state.selection} />

                        {rightPanel}

                    </div>
                </div>
            </section>
        );
    }
}
