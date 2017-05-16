import * as React from "react";

import { CSSProperties } from "react";

import {
    Action,
    availableMeeples,
    begin,
    Game,
    isMeepleAvailable,
    Meeple,
    neighbours,
    Play,
    play,
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

export type Zoom = {
    scale: number;
    position: Position;
};

export type Control =
| "setup"     | "rearrange"
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
    selection: number[];
    zoom: Zoom;
    playQueue: Play[][];
    param?: Lesson;
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.refresher = window.setInterval(() => this.dequeuePlay(), 85);

        const defaultPlayerCount = 1;
        const defaultComputerCount = 1;
        const defaultBoardSize = 20;

        this.state = {
            game: setup(defaultPlayerCount + defaultComputerCount, defaultBoardSize),
            mode: Mode.setup,
            playerCount: defaultPlayerCount,
            computerCount: defaultComputerCount,
            boardSize: defaultBoardSize,
            selection: [],
            zoom: {
                scale: defaultBoardSize,
                position: { row: Math.floor(defaultBoardSize / 2), col: Math.floor(defaultBoardSize / 2) }
            },
            playQueue: [[], [], [], [], [], []]
        };

        this.wheel = this.wheel.bind(this);
        window.removeEventListener("mousewheel", this.wheel);
        window.addEventListener("mousewheel", this.wheel);
    }

    setup(control: Control, param?: Lesson): void {

        switch (control) {

            case "setup":

            const defaultPlayerCount = 1;
            const defaultComputerCount = 1;
            const defaultBoardSize = 20;

            this.setState({
                game: setup(defaultPlayerCount + defaultComputerCount, defaultBoardSize),
                mode: Mode.setup,
                playerCount: defaultPlayerCount,
                computerCount: defaultComputerCount,
                boardSize: defaultBoardSize,
                selection: [],
                zoom: {
                    scale: defaultBoardSize,
                    position: { row: Math.floor(defaultBoardSize / 2), col: Math.floor(defaultBoardSize / 2) }
                },
                playQueue: [[], [], [], [], [], []]
            });

            break;

            case "rearrange":

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize),
                zoom: {
                    scale: this.state.boardSize,
                    position: { row: Math.floor(this.state.boardSize / 2), col: Math.floor(this.state.boardSize / 2) }
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

            if (this.state.boardSize > (this.state.playerCount + this.state.computerCount + 1) * 5) {

                const boardSize = this.state.boardSize - 5;

                this.setState({
                    game: setup(this.state.playerCount + this.state.computerCount, boardSize),
                    boardSize: boardSize,
                    zoom: {
                        scale: boardSize,
                        position: { row: Math.floor(boardSize / 2), col: Math.floor(boardSize / 2) }
                    }
                });
            }

            break;

            case "+size":

            const boardSize = this.state.boardSize + 5;

            this.setState({
                game: setup(this.state.playerCount + this.state.computerCount, boardSize),
                boardSize: boardSize,
                zoom: {
                    scale: boardSize,
                    position: { row: Math.floor(boardSize / 2), col: Math.floor(boardSize / 2) }
                }
            });

            break;

            case "begin":

            this.setState({
                game: begin(this.state.game),
                mode: Mode.play,
                zoom: {
                    scale: this.state.boardSize,
                    position: { row: Math.floor(this.state.boardSize / 2), col: Math.floor(this.state.boardSize / 2) }
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
                    scale: this.state.boardSize,
                    position: { row: Math.floor(this.state.boardSize / 2), col: Math.floor(this.state.boardSize / 2) }
                },
                param: p
            });

            break;
        }
    }

    enqueuePlay(team: Team, action: Action): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.selection.length > 0) {

            queue[team].push({
                team: team,
                action: action,
                selection: this.state.selection
            });
        }

        this.setState({
            playQueue: queue,
            selection: []
        });
    }

    dequeuePlay(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.turn.team].length > 0) {

            const playData: Play = queue[this.state.game.turn.team].shift() as Play;
            const gameStep = play(this.state.game, playData);

            const mode =
                gameStep.outcome[0].type === "gameover" ?
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

    select(position: Position, selectmode: "swarm" | "meeple" = "meeple"): void {

        if (this.state.game.turn.team !== Team.default) {

            if (selectmode === "swarm") {

                if (isMeepleAvailable(this.state.game, position)) {

                    const terrain = this.state.game.terrains[positionToIndex(position, this.state.game.boardSize)];

                    if (terrain.construction.type === "city"
                        && terrain.construction.team !== this.state.game.turn.team) {

                        this.setState({
                            selection: [terrain.topMeeple],
                            zoom: {
                                scale: this.state.zoom.scale,
                                position: this.state.game.meeples[terrain.topMeeple].position
                            }
                        });
                    } else {

                        const selection = selectSwarm(this.state.game, position);

                        this.setState({
                            selection: selection,
                            zoom: selection.length === 0 ? this.state.zoom : {
                                scale: this.state.zoom.scale,
                                position: this.state.game.meeples[selection[0]].position
                            }
                        });
                    }
                } else {

                    this.setState({ selection: [] });
                }
            } else {
                if (isMeepleAvailable(this.state.game, position)) {

                    const selection = this.state.selection
                        .filter((mi) =>
                            !(position.row === this.state.game.meeples[mi].position.row
                            && position.col === this.state.game.meeples[mi].position.col));

                    if (selection.length < this.state.selection.length) {

                        this.setState({
                            selection: selection,
                            zoom: selection.length === 0 ? this.state.zoom : {
                                scale: this.state.zoom.scale,
                                position: this.state.game.meeples[selection[0]].position
                            }
                        });
                    } else {

                        const terrain = this.state.game.terrains[positionToIndex(position, this.state.game.boardSize)];

                        if (terrain.construction.type === "city"
                            && terrain.construction.team !== this.state.game.turn.team) {

                            this.setState({
                                selection: [terrain.topMeeple],
                                zoom: {
                                    scale: this.state.zoom.scale,
                                    position: this.state.game.meeples[terrain.topMeeple].position
                                }
                            });
                        } else {

                            selection.push(terrain.topMeeple);
                            this.setState({
                                selection: selection,
                                zoom: {
                                    scale: this.state.zoom.scale,
                                    position: this.state.game.meeples[selection[0]].position
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    autoSelect(): void {

        const meeples = availableMeeples(this.state.game);
        if (meeples.length > 0) {

            const maxSwarm = meeples.map((meeple) =>
                ({ p: meeple.position, s: selectSwarm(this.state.game, meeple.position).length }))
                .reduce((a, b) => b.s > a.s ? b :
                    this.state.game.terrains[positionToIndex(b.p, this.state.game.boardSize)]
                        .construction.type !== "city"
                    && this.state.game.terrains[positionToIndex(a.p, this.state.game.boardSize)]
                        .construction.type === "city" ? b : a);

            const selection = selectSwarm(this.state.game, maxSwarm.p);

            this.setState({
                selection: selection,
                zoom: selection.length === 0 ? this.state.zoom : {
                    scale: this.state.zoom.scale,
                    position: this.state.game.meeples[selection[0]].position
                }
            });
        }
    }

    wheel(e: WheelEvent): void {

        const board = document.getElementById("board");

        if (board) {

            if ((e.currentTarget as Element).id === board.id) {

                e.preventDefault();

                this.setState({
                    zoom: {
                        scale: Math.min(this.state.boardSize,
                            Math.max(1, this.state.zoom.scale * (e.wheelDelta < 0 ? 1.15 : 0.85))),
                        position: this.state.zoom.position
                    }
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
                mode={this.state.mode} />;
        }

        const panelStyle: CSSProperties = {
            display: "inline-block",
            margin: "1vmin",
            width: "36vmin",
            height: "95vmin",
            overflow: "hidden"
        };

        const rightPanel = this.state.mode === Mode.play || this.state.mode === Mode.end ?
            <Controls
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                selection={this.state.selection}
                game={this.state.game} /> : null;

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
                <div style={{ display: "inline-block", width: "76vmin" }}>
                    <div style={panelStyle}>
                        {leftPanel}
                    </div>
                    <div style={panelStyle}>
                        {rightPanel}
                    </div>
                </div>
            </div>
        );
    }
}
