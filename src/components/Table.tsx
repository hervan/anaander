import * as React from "react";

import {
    Action,
    availableMeeples,
    begin,
    Game,
    isMeepleAvailable,
    Item,
    Meeple,
    neighbours,
    Play,
    play,
    Position,
    positionToIndex,
    selectSwarm,
    setup,
    Team,
    Turn,
    tutorial
} from "../Game";

import Board from "./Board";
import Controls from "./Controls";
import Setup from "./Setup";
import Status from "./Status";
import Tutorial, { Lesson } from "./Tutorial";

export enum Mode {
    tutorial,
    setup,
    play,
    end
};

export type SelectMode =
| "swarm"
| "pattern"
| "individual";

export type Control =
| "setup"     | "rearrange"
| "-player"   | "+player"
| "-computer" | "+computer"
| "-size"     | "+size"
| "begin"     | "tutorial"
| SelectMode;

interface IState {
    game: Game;
    mode: Mode;
    selectMode: SelectMode;
    playerCount: number;
    computerCount: number;
    boardSize: number;
    selection: Position[];
    playQueue: Play[][];
    param?: Lesson | Item;
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.refresher = window.setInterval(() => this.dequeue(), 85);

        const defaultPlayerCount = 1;
        const defaultComputerCount = 1;
        const defaultBoardSize = 16;

        this.state = {
            game: setup(defaultPlayerCount + defaultComputerCount, defaultBoardSize),
            mode: Mode.setup,
            selectMode: "swarm",
            playerCount: defaultPlayerCount,
            computerCount: defaultComputerCount,
            boardSize: defaultBoardSize,
            selection: [],
            playQueue: [[], [], [], [], [], []]
        };
    }

    setup(control: Control, param?: Lesson | Item): void {

        switch (control) {

            case "setup":

            const defaultPlayerCount = 1;
            const defaultComputerCount = 1;
            const defaultBoardSize = 16;

            this.setState({
                game: setup(defaultPlayerCount + defaultComputerCount, defaultBoardSize),
                mode: Mode.setup,
                playerCount: defaultPlayerCount,
                computerCount: defaultComputerCount,
                boardSize: defaultBoardSize,
                selection: [],
                playQueue: [[], [], [], [], [], []]
            });

            break;

            case "rearrange":

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize),
            });

            break;

            case "-player":

            if (this.state.playerCount > 0 && this.state.playerCount + this.state.computerCount > 1) {

                this.setState({
                    game: setup((this.state.playerCount - 1) + this.state.computerCount, this.state.boardSize),
                    playerCount: this.state.playerCount - 1,
                });
            }

            break;

            case "+player":

            if (this.state.playerCount + this.state.computerCount < 5) {

                this.setState({
                    game: setup((this.state.playerCount + 1) + this.state.computerCount, this.state.boardSize),
                    playerCount: this.state.playerCount + 1,
                });
            }

            break;

            case "-computer":

            if (this.state.computerCount > 0 && this.state.playerCount + this.state.computerCount > 1) {

                this.setState({
                    game: setup(this.state.playerCount + (this.state.computerCount - 1), this.state.boardSize),
                    computerCount: this.state.computerCount - 1,
                });
            }

            break;

            case "+computer":

            if (this.state.playerCount + this.state.computerCount < 5) {

                this.setState({
                    game: setup(this.state.playerCount + (this.state.computerCount + 1), this.state.boardSize),
                    computerCount: this.state.computerCount + 1,
                });
            }

            break;

            case "-size":

            if (this.state.boardSize > this.state.playerCount + this.state.computerCount + 3) {

                this.setState({
                    game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize - 1),
                    boardSize: this.state.boardSize - 1,
                });
            }

            break;

            case "+size":

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize + 1),
                boardSize: this.state.boardSize + 1,
            });

            break;

            case "begin":

            this.setState({
                game: begin(this.state.game),
                mode: Mode.play
            });
            this.autoSelect();

            break;

            case "tutorial":

            const p = param ? param as Lesson : { index: 0 };

            this.setState({
                game: tutorial(p.index),
                mode: Mode.tutorial,
                param: p
            });

            break;

            case "swarm":
            case "pattern":
            case "individual":

            this.setState({
                selectMode: control,
                param: param
            });

            break;
        }
    }

    enqueuePlay(team: Team, action: Action): void {

        const queue: Play[][] = this.state.playQueue;

        if (action === Action.skip) {

            queue[team].push({
                team: team,
                play: {
                    type: "skip",
                    action: action
                }
            });
        } else if (this.state.selection.length > 0) {

            queue[team].push({
                team: team,
                play: {
                    action: action,
                    type: "swarm",
                    swarm: this.state.selection[0]
                }
            });
        }

        this.setState({
            playQueue: queue,
            selection: []
        });
    }

    dequeue(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.currentTeam].length > 0) {

            const playData: Play = queue[this.state.game.currentTeam].shift() as Play;
            const gameStep = play(this.state.game, playData);

            const mode =
                gameStep.turn === Turn.none ?
                Mode.end :
                this.state.mode;

            this.setState({
                game: gameStep,
                mode: mode,
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

        switch (this.state.selectMode) {

            case "swarm":

            if (this.state.game.currentTeam !== Team.default) {

                this.setState({ selection: selectSwarm(this.state.game, position) });
            }

            break;

            case "individual":

            if (isMeepleAvailable(this.state.game, position)) {

                this.setState({ selection: [position] });
            }

            break;

            case "pattern":

            break;
        }
    }

    autoSelect(): void {

        const meeples = availableMeeples(this.state.game);

        if (meeples.length > 0) {

            const selection = selectSwarm(this.state.game, meeples[0].position);

            if (meeples.length === selection.length) {

                this.setState({
                    selectMode: "swarm",
                    selection: selection
                });
            } else {

                this.setState({
                    selectMode: "swarm",
                    selection: []
                });
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
                lesson={this.state.param as Lesson} />;
            break;

            case Mode.setup:
            leftPanel = <Setup
                game={this.state.game}
                playerCount={this.state.playerCount}
                computerCount={this.state.computerCount}
                boardSize={this.state.boardSize}
                setup={this.setup.bind(this)} />;
            break;

            default:
            leftPanel = <Status
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                game={this.state.game}
                mode={this.state.mode}
                selection={this.state.selection} />;
        }

        const rightPanel = this.state.mode !== Mode.tutorial ?
            <Controls
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                game={this.state.game}
                selection={this.state.selection}
                selectMode={this.state.selectMode}
                item={this.state.param as Item} /> :
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
