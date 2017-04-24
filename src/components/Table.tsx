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
    PlayType,
    Position,
    positionToIndex,
    selectSwarm,
    setup,
    Side,
    Team,
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

export type Control =
| "setup"     | "rearrange"
| "-player"   | "+player"
| "-computer" | "+computer"
| "-size"     | "+size"
| "begin"     | "tutorial"
| PlayType;

export type Zoom = {
    scale: number;
    origin: {
        x: number;
        y: number;
    };
};

interface IState {
    game: Game;
    mode: Mode;
    playType: PlayType;
    playerCount: number;
    computerCount: number;
    boardSize: number;
    selection: Position[];
    zoom: Zoom;
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
            playType: "swarm",
            playerCount: defaultPlayerCount,
            computerCount: defaultComputerCount,
            boardSize: defaultBoardSize,
            selection: [],
            zoom: {
                scale: 1,
                origin: { x: 0, y: 0 }
            },
            playQueue: [[], [], [], [], [], []]
        };

        this.wheel = this.wheel.bind(this);
        window.removeEventListener("mousewheel", this.wheel);
        window.addEventListener("mousewheel", this.wheel);
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
                playType: "swarm",
                playerCount: defaultPlayerCount,
                computerCount: defaultComputerCount,
                boardSize: defaultBoardSize,
                selection: [],
                zoom: {
                    scale: 1,
                    origin: { x: 0, y: 0 }
                },
                playQueue: [[], [], [], [], [], []]
            });

            break;

            case "rearrange":

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize),
                zoom: {
                    scale: 1,
                    origin: { x: 0, y: 0 }
                }
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
                    zoom: {
                        scale: 1,
                        origin: { x: 0, y: 0 }
                    }
                });
            }

            break;

            case "+size":

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize + 1),
                boardSize: this.state.boardSize + 1,
                zoom: {
                    scale: 1,
                    origin: { x: 0, y: 0 }
                }
            });

            break;

            case "begin":

            this.setState({
                game: begin(this.state.game),
                mode: Mode.play,
                zoom: {
                    scale: 1,
                    origin: { x: 0, y: 0 }
                }
            });
            this.autoSelect();

            break;

            case "tutorial":

            const p = param ? param as Lesson : { index: 0 };

            this.setState({
                game: tutorial(p.index),
                mode: Mode.tutorial,
                zoom: {
                    scale: 1,
                    origin: { x: 0, y: 0 }
                },
                param: p
            });

            break;

            case "swarm":
            case "pattern":
            case "individual":

            this.setState({
                playType: control,
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
                    action: Action.skip
                }
            });
        } else {

            switch (this.state.playType) {

                case "swarm":

                if (this.state.selection.length > 0) {

                    queue[team].push({
                        team: team,
                        play: {
                            type: this.state.playType,
                            action: action,
                            swarm: this.state.selection
                        }
                    });
                }

                break;

                case "pattern":

                if (this.state.selection.length === 5) {

                    queue[team].push({
                        team: team,
                        play: {
                            type: this.state.playType,
                            pattern: this.state.selection.slice(0, 4),
                            meeple: this.state.selection[4]
                        }
                    });
                }

                break;

                case "individual":

                if (this.state.selection.length === 1) {

                    queue[team].push({
                        team: team,
                        play: {
                            type: this.state.playType,
                            action: action,
                            meeple: this.state.selection[0]
                        }
                    });
                }

                break;
            }
        }

        this.setState({
            playQueue: queue,
            selection: []
        });
    }

    dequeue(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.turn.team].length > 0) {

            const playData: Play = queue[this.state.game.turn.team].shift() as Play;
            const gameStep = play(this.state.game, playData);

            const mode =
                gameStep.turn.side === Side.none ?
                Mode.end :
                this.state.mode;

            this.setState({
                game: gameStep,
                mode: mode,
                playQueue: queue,
                selection: []
            });

            if (gameStep.turn.team !== Team.default
                && queue[this.state.game.turn.team].length === 0) {

                this.autoSelect();
            }
        }
    }

    select(position: Position): void {

        switch (this.state.playType) {

            case "swarm":

            if (this.state.game.turn.team !== Team.default) {

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
                    playType: "swarm",
                    selection: selection
                });
            } else {

                this.setState({
                    playType: "swarm",
                    selection: []
                });
            }
        } else {

            this.enqueuePlay(this.state.game.turn.team, Action.skip);
        }
    }

    wheel(e: WheelEvent): void {

        const board = document.getElementById("board");

        if (board) {

            if ((e.currentTarget as Element).id === board.id) {

                const zoom: Zoom = {
                    scale: Math.max(1, this.state.zoom.scale * (e.wheelDelta > 0 ? 1.15 : 0.85)),
                    origin: { x: e.x, y: e.y }
                };

                this.setState({
                    zoom: zoom
                });
            } else {

                window.removeEventListener("mousewheel", this.wheel);
                board.addEventListener("mousewheel", this.wheel);
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

        const panelStyle = {
            display: "inline-block",
            margin: "2vmin",
            width: "47.5vmin",
            height: "95vmin",
            overflow: "hidden"
        };

        const rightPanel = this.state.mode === Mode.play || this.state.mode === Mode.end ?
            <div style={panelStyle}>
                <Controls
                    setup={this.setup.bind(this)}
                    enqueuePlay={this.enqueuePlay.bind(this)}
                    select={this.select.bind(this)}
                    game={this.state.game}
                    selection={this.state.selection}
                    playType={this.state.playType}
                    item={this.state.param as Item} />
            </div> :
            null;

        return (
            <div>
                <Board
                    setup={this.setup.bind(this)}
                    enqueuePlay={this.enqueuePlay.bind(this)}
                    game={this.state.game}
                    select={this.select.bind(this)}
                    selection={this.state.selection}
                    zoom={this.state.zoom}
                />
                <div style={panelStyle}>
                    {leftPanel}
                </div>
                {rightPanel}
            </div>
        );
    }
}
