import * as React from "react";

import {
    Action,
    Game,
    Meeple,
    Mode,
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

interface IState {
    game: Game;
    selection: Position[];
    playQueue: Play[][];
    lesson?: Lesson;
};

export interface IProps {
    game: Game;
    selection: Position[];
    enqueuePlay: (play: Play, lesson?: Lesson) => void;
    select: (position: Position) => void;
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.refresher = window.setInterval(() => this.dequeue(), 85);

        this.state = {
            game: setup(0),
            selection: [],
            playQueue: [[], [], [], [], [], []]
        };
    }

    enqueuePlay(playData: Play, lesson?: Lesson): void {

        if (playData.team === Team.default) {

            switch (playData.mode) {

                case Mode.setup:

                if (playData.action === null) {

                    this.setState({
                        game: setup(0),
                        selection: [],
                        playQueue: [[], [], [], [], [], []]
                    });

                } else {

                    const change: number =
                        (playData.action === Action.skip ? 0 : this.state.game.players.length)
                        + (playData.action === Action.right && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === Action.left && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({ game: setup(change) });
                }

                break;

                case Mode.tutorial:

                this.setState({
                    game: tutorial(lesson!.index),
                    selection: [],
                    playQueue: [[], [], [], [], [], []],
                    lesson: lesson
                });

                break;

                case Mode.play:

                this.setState({ game: play(this.state.game, playData) });
                this.autoSelect();

                break;
            }
        } else {

            const queue: Play[][] = this.state.playQueue;
            queue[playData.team].push(playData);
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

            if (gameStep.mode === Mode.play
                && queue[this.state.game.currentTeam].length === 0) {

                this.autoSelect();
            }
        }
    }

    select(position: Position): void {

        if (this.state.game.currentTeam !== Team.default) {

            const swarmPositions = selectSwarm(this.state.game, position);

            if (swarmPositions.length > 0) {

                const deSelection = this.state.selection.filter((pos) =>
                    !swarmPositions.some((p) => p.row === pos.row && p.col === pos.col));

                this.setState({ selection:
                    this.state.selection.some((pos) => pos.row === position.row && pos.col === position.col) ?
                    deSelection :
                    deSelection.concat(swarmPositions)
                });
            }
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

        switch (this.state.game.mode) {

            case Mode.tutorial:
            leftPanel = <Tutorial
                enqueuePlay={this.enqueuePlay.bind(this)}
                lesson={this.state.lesson!} />;
            break;

            case Mode.setup:
            leftPanel = <Setup
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} />;
            break;

            default:
            leftPanel = <Status
                game={this.state.game}
                selection={this.state.selection}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)} />;
        }

        const rightPanel = this.state.game.mode !== Mode.tutorial ?
            <Controls
                game={this.state.game}
                selection={this.state.selection}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)} /> :
            null;

        return (
            <section className="section">
                <div className="container is-fluid">
                    <div id="table" className="tile is-ancestor">

                        {leftPanel}

                        <Board
                            game={this.state.game}
                            selection={this.state.selection}
                            enqueuePlay={this.enqueuePlay.bind(this)}
                            select={this.select.bind(this)} />

                        {rightPanel}

                    </div>
                </div>
            </section>
        );
    }
}
