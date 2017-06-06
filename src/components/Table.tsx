import * as React from "react";
import {CSSProperties} from "react";

import Card from "../logic/Card";
import {
    Action,
    availableMeeples,
    begin,
    Game,
    isMeepleAvailable,
    neighbours,
    Play,
    play,
    selectSwarm,
    setup
} from "../logic/Game";
import {Team} from "../logic/Player";
import {Position, positionToIndex} from "../logic/Terrain";

import Board from "./Board";
import Controls from "./Controls";
import Setup from "./Setup";
import Status from "./Status";

export enum Mode {
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
| "begin";

interface IState {
    game: Game;
    mode: Mode;
    playerCount: number;
    computerCount: number;
    boardSize: number;
    selection: number[];
    zoom: Zoom;
    playQueue: Play[][];
    history: IState[];
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.dequeuePlay = this.dequeuePlay.bind(this);
        this.autoselect = this.autoselect.bind(this);
        this.autoplay = this.autoplay.bind(this);
        this.refresher = window.setInterval(() => this.dequeuePlay(), 1);

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
            playQueue: [[], [], [], [], [], []],
            history: []
        };

        this.wheel = this.wheel.bind(this);
        window.removeEventListener("mousewheel", this.wheel);
        window.addEventListener("mousewheel", this.wheel);

        this.handleDrop = this.handleDrop.bind(this);
        window.removeEventListener("drop", this.handleDrop);
        window.addEventListener("drop", this.handleDrop, false);

        window.addEventListener("dragenter", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });

        window.addEventListener("dragover", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    setup(control: Control): void {

        switch (control) {

            case "setup":

            const defaultPlayerCount = 1;
            const defaultComputerCount = 1;
            const defaultBoardSize = 20;

            this.setState((prevState, props) => ({
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
            }));

            break;

            case "rearrange":

            this.setState((prevState, props) => ({
                game: setup(prevState.playerCount + prevState.computerCount, prevState.boardSize),
                zoom: {
                    scale: prevState.boardSize,
                    position: { row: Math.floor(prevState.boardSize / 2), col: Math.floor(prevState.boardSize / 2) }
                }
            }));

            break;

            case "-player":

            if (this.state.playerCount > 0 && this.state.playerCount + this.state.computerCount > 1) {

                this.setState((prevState, props) => ({
                    game: setup((prevState.playerCount - 1) + prevState.computerCount, prevState.boardSize),
                    playerCount: prevState.playerCount - 1,
                }));
            }

            break;

            case "+player":

            if (this.state.playerCount + this.state.computerCount < 5) {

                this.setState((prevState, props) => ({
                    game: setup((prevState.playerCount + 1) + prevState.computerCount, prevState.boardSize),
                    playerCount: prevState.playerCount + 1,
                }));
            }

            break;

            case "-computer":

            if (this.state.computerCount > 0 && this.state.playerCount + this.state.computerCount > 1) {

                this.setState((prevState, props) => ({
                    game: setup(prevState.playerCount + (prevState.computerCount - 1), prevState.boardSize),
                    computerCount: prevState.computerCount - 1,
                }));
            }

            break;

            case "+computer":

            if (this.state.playerCount + this.state.computerCount < 5) {

                this.setState((prevState, props) => ({
                    game: setup(prevState.playerCount + (prevState.computerCount + 1), prevState.boardSize),
                    computerCount: prevState.computerCount + 1,
                }));
            }

            break;

            case "-size":

            if (this.state.boardSize > 20) {

                this.setState((prevState, props) => {

                    const boardSize = prevState.boardSize - 4;

                    return ({
                        game: setup(prevState.playerCount + prevState.computerCount, boardSize),
                        boardSize: boardSize,
                        zoom: {
                            scale: boardSize,
                            position: {
                                row: Math.floor(boardSize / 2),
                                col: Math.floor(boardSize / 2)
                            }
                        }
                    });
                });
            }

            break;

            case "+size":

            this.setState((prevState, props) => {

                const boardSize = prevState.boardSize + 4;

                return ({
                    game: setup(prevState.playerCount + prevState.computerCount, boardSize),
                    boardSize: boardSize,
                    zoom: {
                        scale: boardSize,
                        position: {
                            row: Math.floor(boardSize / 2),
                            col: Math.floor(boardSize / 2)
                        }
                    }
                });
            });

            break;

            case "begin":

            this.setState((prevState, props) => ({
                game: begin(prevState.game),
                mode: Mode.play,
                zoom: {
                    scale: prevState.boardSize,
                    position: {
                        row: Math.floor(prevState.boardSize / 2),
                        col: Math.floor(prevState.boardSize / 2)
                    }
                }
            }));

            this.autoselect();

            break;
        }
    }

    enqueuePlay(team: Team, action:
        | Action.hold | Action.explore
        | Action.up | Action.left
        | Action.down | Action.right): void {

        this.setState((prevState, props) => {

            const queue: Play[][] = prevState.playQueue.slice();

            if (prevState.selection.length > 0) {

                queue[team].push({
                    team: team,
                    action: action,
                    selection: prevState.selection.slice()
                });
            }

            return ({
                playQueue: queue.slice(),
                selection: []
            });
        });
    }

    dequeuePlay(): void {

        if (this.state.game.players.length > 0
            && this.state.game.turn.team !== -1
            && this.state.game.turn.team !== Team.default) {

            if (this.state.playQueue[this.state.game.turn.team].length > 0) {

                this.setState((prevState, props) => {

                    const queue: Play[][] = prevState.playQueue.slice();
                    const playData: Play = queue[prevState.game.turn.team].shift() as Play;
                    const gameStep = play(prevState.game, playData);

                    const mode =
                        gameStep.outcome[0].type === "gameover" ?
                        Mode.end :
                        prevState.mode;

                    const nextState = {
                        ...prevState,
                        game: gameStep,
                        mode: mode,
                        playQueue: queue.slice(),
                        selection: [],
                    };

                    delete nextState.history;

                    return ({
                        ...nextState,
                        history: prevState.game.turn.team < prevState.playerCount
                            && gameStep.outcome.some((oc) => oc.type !== "invalid") ? [
                            {...nextState},
                            ...prevState.history.slice()
                        ] : prevState.history.slice()
                    });
                });

                this.autoselect();

            } else {

                if (this.state.game.turn.team > this.state.playerCount - 1) {

                    if (this.state.selection.length === 0) {

                        this.autoselect();

                    } else {

                        this.autoplay();
                    }
                }
            }
        }
    }

    rewind(step: number): void {

        this.setState((prevState, props) => ({
            ...prevState.history[step],
            history: prevState.history.slice(step)
        }));
    }

    saveGame(step: number): string {

        const data = new File([JSON.stringify(this.state.history[step])], "anaander-save.json", {type: "text/plain"});
        return URL.createObjectURL(data);
    }

    handleDrop(e: DragEvent): void {

        e.stopPropagation();
        e.preventDefault();

        const reader: FileReader = new FileReader();
        reader.onloadend = () => {

            this.loadMatch(JSON.parse(reader.result));
        };

        const file = e.dataTransfer.files[0];
        reader.readAsText(file);
    }

    loadMatch(state: IState): void {

        this.setState((prevState, props) => ({...state}));
    }

    playCard(cardKey: number): void {

        const team: Team = this.state.game.turn.team;

        if (team !== -1 && this.state.game.players[team].hand.some((c) => c.key === cardKey)) {

            this.setState((prevState, props) => {

                const queue: Play[][] = prevState.playQueue.slice();

                if (prevState.selection.length > 0) {

                    queue[team].push({
                        team: team,
                        action: Action.card,
                        selection: prevState.selection.slice(),
                        cardKey: cardKey
                    });
                }

                return ({
                    playQueue: queue.slice(),
                    selection: []
                });
            });
        }
    }

    select(position: Position, selectmode: "swarm" | "meeple" = "meeple"): void {

        if (this.state.game.turn.team !== Team.default) {

            if (selectmode === "swarm") {

                if (isMeepleAvailable(this.state.game, position)) {

                    const terrain = this.state.game.terrains[positionToIndex(position, this.state.game.boardSize)];

                    if (terrain.construction.type === "city"
                        && terrain.construction.team !== this.state.game.turn.team) {

                        this.setState((prevState, props) => ({
                            selection: [terrain.topMeeple],
                            zoom: {
                                scale: prevState.zoom.scale,
                                position: prevState.game.meeples[terrain.topMeeple].position
                            }
                        }));
                    } else {

                        this.setState((prevState, props) => {

                            const selection = selectSwarm(prevState.game, position);

                            return ({
                                selection: selection.slice(),
                                zoom: selection.length === 0 ? prevState.zoom : {
                                    scale: prevState.zoom.scale,
                                    position: prevState.game.meeples[selection[0]].position
                                }
                            });
                        });
                    }
                } else {

                    this.setState((prevState, props) => ({ selection: [] }));
                }
            } else {
                if (isMeepleAvailable(this.state.game, position)) {

                    this.setState((prevState, props) => {

                        const selection = prevState.selection.slice()
                            .filter((mi) =>
                                !(position.row === prevState.game.meeples[mi].position.row
                                && position.col === prevState.game.meeples[mi].position.col));

                        if (selection.length < prevState.selection.length) {

                            return ({
                                selection: selection.slice(),
                                zoom: selection.length === 0 ? prevState.zoom : {
                                    scale: prevState.zoom.scale,
                                    position: prevState.game.meeples[selection[0]].position
                                }
                            });
                        } else {

                            const terrain =
                                prevState.game.terrains[positionToIndex(position, prevState.game.boardSize)];

                            if (terrain.construction.type === "city"
                                && terrain.construction.team !== prevState.game.turn.team) {

                                return ({
                                    selection: [terrain.topMeeple],
                                    zoom: {
                                        scale: prevState.zoom.scale,
                                        position: prevState.game.meeples[terrain.topMeeple].position
                                    }
                                });
                            } else {

                                selection.push(terrain.topMeeple);
                                return ({
                                    selection: selection.slice(),
                                    zoom: {
                                        scale: prevState.zoom.scale,
                                        position: prevState.game.meeples[selection[0]].position
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    }

    autoselect(): void {

        const meeples = availableMeeples(this.state.game);
        if (meeples.length > 0) {

            this.setState((prevState, props) => {

                const maxSwarm = meeples.map((meeple) =>
                    ({ p: meeple.position, s: selectSwarm(prevState.game, meeple.position).length }))
                    .reduce((a, b) => b.s > a.s ? b :
                        prevState.game.terrains[positionToIndex(b.p, prevState.game.boardSize)]
                            .construction.type !== "city"
                        && prevState.game.terrains[positionToIndex(a.p, prevState.game.boardSize)]
                            .construction.type === "city" ? b : a);

                const selection = selectSwarm(prevState.game, maxSwarm.p);

                return ({
                    selection: selection.slice(),
                    zoom: selection.length === 0 ? prevState.zoom : {
                        scale: prevState.zoom.scale,
                        position: prevState.game.meeples[selection[0]].position
                    }
                });
            });
        }
    }

    autoplay(): void {

        let playData = {};
        let gameStep = {};
        let actions: Action[] = [...Array(6).keys()].map((o, i) => i as Action);

        do {
            this.setState((prevState, props) => {

                const action = actions.splice(Math.floor(Math.random() * actions.length), 1)[0];
                const prevGame = prevState.game;
                const hand = prevGame.players[prevGame.turn.team].hand;

                playData = (action === Action.card) ? {
                    team: prevGame.turn.team,
                    action: action,
                    selection: prevState.selection.slice(),
                    cardKey: hand.length > 0 ?
                        hand[Math.floor(Math.random() * hand.length)].key :
                        -1
                } : {
                    team: prevGame.turn.team,
                    action: action,
                    selection: prevState.selection.slice()
                };

                const game: Game = {
                    boardSize: prevGame.boardSize,
                    terrains: prevGame.terrains.slice(),
                    players: prevGame.players.slice(),
                    meeples: prevGame.meeples.slice(),
                    decks: prevGame.decks.slice(),
                    discardPiles: prevGame.discardPiles.slice(),
                    turn: {
                        ...prevGame.turn
                    },
                    outcome: prevGame.outcome.slice()
                };
                gameStep = play(game, (playData as Play));

                return {};
            });
        } while (actions.length > 0
            && (gameStep as Game).outcome[(gameStep as Game).outcome.length - 1].type === "invalid");

        const gameStepT = gameStep as Game;
        const playDataT = playData as Play;

        if (gameStepT.outcome[gameStepT.outcome.length - 1].type === "invalid") {

            this.enqueuePlay(this.state.game.turn.team, Action.hold);

        } else if (playDataT.action === Action.card) {

            this.playCard(playDataT.cardKey);

        } else {

            this.enqueuePlay(this.state.game.turn.team, playDataT.action);
        }
    }

    wheel(e: WheelEvent): void {

        const board = document.getElementById("board");

        if (board) {

            if ((e.currentTarget as Element).id === board.id) {

                e.preventDefault();

                this.setState((prevState, props) => ({
                    zoom: {
                        scale: Math.min(prevState.boardSize,
                            Math.max(1, prevState.zoom.scale * (e.wheelDelta < 0 ? 1.15 : 0.85))),
                        position: prevState.zoom.position
                    }
                }));
            } else {

                window.removeEventListener("mousewheel", this.wheel);
                board.addEventListener("mousewheel", this.wheel);
            }
        }
    }

    render(): JSX.Element {

        let leftPanel: JSX.Element;

        switch (this.state.mode) {

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
                rewind={this.rewind.bind(this)}
                saveGame={this.saveGame.bind(this)}
                history={this.state.history.map((h) => h.game.outcome)}
                game={this.state.game}
                mode={this.state.mode} />;
        }

        const panelStyle: CSSProperties = {
            display: "inline-block",
            margin: "1vmin",
            width: "36vmin",
            height: "95vmin",
            overflowX: "hidden"
        };

        const rightPanel = this.state.mode === Mode.play || this.state.mode === Mode.end ?
            <Controls
                setup={this.setup.bind(this)}
                enqueuePlay={this.enqueuePlay.bind(this)}
                select={this.select.bind(this)}
                selection={this.state.selection}
                playCard={this.playCard.bind(this)}
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
