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

export type Control =
| "setup"     | "rearrange"
| "-player"   | "+player"
| "-computer" | "+computer"
| "-size"     | "+size"
| "begin"     | "tutorial";

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
        const defaultBoardSize = 16;

        this.state = {
            game: setup(defaultPlayerCount + defaultComputerCount, defaultBoardSize),
            mode: Mode.setup,
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

    setup(control: Control, param?: Lesson): void {

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
                game: setup(this.state.playerCount + this.state.computerCount, this.state.boardSize + 16),
                boardSize: this.state.boardSize + 16,
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

    select(position: Position): void {

        if (this.state.game.turn.team !== Team.default) {

            if (isMeepleAvailable(this.state.game, position)) {

                const terrain = this.state.game.terrains[positionToIndex(position, this.state.game.boardSize)];
                const meeple = this.state.game.meeples[terrain.topMeeple];

                if (terrain.construction.type === "city" && terrain.construction.team !== meeple.team) {

                    this.setState({
                        selection:
                            [terrain.topMeeple]
                    });
                } else if (this.state.selection
                    .some((mi) =>
                        position.row === this.state.game.meeples[mi].position.row
                        && position.col === this.state.game.meeples[mi].position.col)) {

                    this.setState({
                        selection:
                            [meeple.key]
                    });
                } else {

                    this.setState({ selection: selectSwarm(this.state.game, position) });
                }
            } else {

                this.setState({ selection: [] });
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

            this.setState({
                selection: selectSwarm(this.state.game, maxSwarm.p)
            });
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
                mode={this.state.mode} />;
        }

        const panelStyle: CSSProperties = {
            display: "inline-block",
            margin: "2vmin",
            width: "45vmin",
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
                <div style={panelStyle}>
                    {leftPanel}
                </div>
                <div style={panelStyle}>
                    {rightPanel}
                </div>
            </div>
        );
    }
}
