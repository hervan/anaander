import * as React from "react";

import { Game, Meeple, Play, Direction, Step, setup, play, teams, tutorial } from "../Game";

import Tutorial from "./Tutorial";
import Status from "./Status";
import Board from "./Board";
import Controls from "./Controls";

interface IState {
    game: Game;
    playQueue: Play[][];
    tutorialStep: Step;
};

export interface IProps {
    game: Game;
    enqueuePlay: (play: Play) => void;
};

export interface ITutorialProps {
    game: Game;
    enqueuePlay: (play: Play) => void;
    step: Step;
};

export class Table extends React.Component<{}, IState> {

    state: IState;
    refresher: number;

    constructor() {

        super();

        const queue: Play[][] = [];

        this.state = { game: setup(0), playQueue: queue, tutorialStep: { step: 0 } };

        document.addEventListener("keypress", (event) => {

            switch (event.key) {

                case "q":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "guard"
                    });

                    break;

                case "w":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "up"
                    });

                    break;

                case "e":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "explore"
                    });

                    break;

                case "a":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "left"
                    });

                    break;

                case "s":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "down"
                    });

                    break;

                case "d":

                    this.enqueuePlay({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "right"
                    });

                    break;

                case " ":

                    if (this.state.game.state === "tutorial") {

                        this.enqueuePlay({
                            state: "tutorial",
                            player: this.state.game.currentPlayer,
                            from: "player",
                            action: "skip"
                        });

                    } else {

                        this.enqueuePlay({
                            state: "play",
                            player: this.state.game.currentPlayer,
                            from: "player",
                            action: null
                        });
                    }

                    break;

                case "/":
                case "?":
                    if (this.state.game.state === "tutorial") {

                        this.enqueuePlay({
                            state: "setup",
                            player: "default",
                            from: "player",
                            action: "skip"
                        });
                    } else {

                        this.enqueuePlay({
                            state: "tutorial",
                            player: "default",
                            from: "player",
                            action: null
                        });
                    }

                    break;
            }
        });
    }

    enqueuePlay(play: Play): void {

        const queue: Play[][] = this.state.playQueue;

        if (!queue[teams.indexOf(play.player)]) {

            queue[teams.indexOf(play.player)] = [];
        }

        queue[teams.indexOf(play.player)].push(play);

        this.setState({ playQueue: queue });
    }

    componentDidUpdate(): void {

        const queue: Play[][] = this.state.playQueue;

        if (!queue[teams.indexOf(this.state.game.currentPlayer)]) {

            queue[teams.indexOf(this.state.game.currentPlayer)] = [];
        }

        if (this.state.game.state === "tutorial") {

            if (queue[teams.indexOf("default")].length > 0) {

                const playTutorial: Play = queue[teams.indexOf("default")].shift() as Play;

                if (playTutorial.state === "tutorial") {

                    queue[teams.indexOf("default")].push(playTutorial);
                    this.setState({
                        game: tutorial((playTutorial.action as Step).step),
                        playQueue: queue,
                        tutorialStep: playTutorial.action as Step
                    });
                } else {

                    this.setState({ game: play(this.state.game, playTutorial), playQueue: queue });
                }
            }
        } else {

            if (queue[teams.indexOf(this.state.game.currentPlayer)].length > 0) {

                const playData: Play = queue[teams.indexOf(this.state.game.currentPlayer)].shift() as Play;

                switch (playData.state) {

                    case "setup":

                        const change: number =
                            (playData.action === "skip" ? 0 : this.state.game.players.length)
                            + (playData.action === "right" && this.state.game.players.length < 5 ? 1 : 0)
                            + (playData.action === "left" && this.state.game.players.length > 0 ? -1 : 0);

                        this.setState({ game: setup(change), playQueue: queue });

                        break;

                    case "play":

                        const gameStep = play(this.state.game, playData);
                        this.setState({ game: gameStep, playQueue: queue });

                        if (gameStep.state === "end") {
                            
                            clearInterval(this.refresher);
                            this.refresher = window.setInterval(() => this.animateEnding(), 300);
                        }

                        break;

                    case "end":

                        this.setState({ game: play(this.state.game, playData), playQueue: queue });

                        break;

                    case "tutorial":

                        if (playData.action === null) {

                            this.setState({ game: setup(5, undefined, true), playQueue: queue });

                        } else {

                            const gameStep: Game = play(this.state.game, playData);

                            if (gameStep.state === "end") {

                                this.setState({ playQueue: queue });

                            } else {

                                this.setState({ game: gameStep, playQueue: queue });
                            }
                        }

                        break;
                }
            }
        }
    }

    animateEnding(): void {

        const queue: Play[][] = this.state.playQueue;

        if (queue[teams.indexOf(this.state.game.currentPlayer)].length === 0) {

            const currentPlayerMeeples: Meeple[] = this.state.game.meeples
                .filter((meeple) => meeple.key !== -1 &&
                    meeple.team === this.state.game.currentPlayer);

            if (currentPlayerMeeples.length > 0) {

                const dirs: Direction[] = [ "up", "left", "down", "right" ];

                const weights: number[] = currentPlayerMeeples
                    .map((meeple) => [
                        (meeple.position.row + 1) / (this.state.game.boardSize + 1),
                        (meeple.position.col + 1) / (this.state.game.boardSize + 1),
                        (this.state.game.boardSize - meeple.position.row) / (this.state.game.boardSize + 1),
                        (this.state.game.boardSize - meeple.position.col) / (this.state.game.boardSize + 1)
                    ])
                    .reduce((acc, positions) => [
                        acc[0] + (positions[0] / currentPlayerMeeples.length),
                        acc[1] + (positions[1] / currentPlayerMeeples.length),
                        acc[2] + (positions[2] / currentPlayerMeeples.length),
                        acc[3] + (positions[3] / currentPlayerMeeples.length)
                    ], [0, 0, 0, 0]);

                let rollNumber: number = Math.random() * 2;
                let roll: number = 0;

                while (rollNumber > 0) {

                    rollNumber -= weights[roll++];
                }

                const dir: Direction = dirs[roll - 1];

                const repetitions: number = Math.random() * this.state.game.boardSize / 2;

                const nextPlay: Play[] = [];

                for (let i: number = 0; i < repetitions; i++) {

                    nextPlay.push({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: dir
                    });
                }

                queue[teams.indexOf(this.state.game.currentPlayer)] =
                    queue[teams.indexOf(this.state.game.currentPlayer)].concat(nextPlay);

                this.setState({ playQueue: queue });

            } else {

                queue[teams.indexOf(this.state.game.currentPlayer)].push({
                    state: this.state.game.state,
                    player: this.state.game.currentPlayer,
                    from: "player",
                    action: "skip"
                });

                this.setState({ playQueue: queue });
            }
        }
    }

    componentWillUnmount(): void {

        clearInterval(this.refresher);
    }

    render(): JSX.Element {

        if (this.state.game.state === "tutorial") {
            return (
                <section className="section">
                    <div className="container is-fluid">
                        <div id="table" className="tile is-ancestor">
                            <Tutorial game={this.state.game}
                                enqueuePlay={this.enqueuePlay.bind(this)}
                                step={this.state.tutorialStep} />
                            <Board
                                game={this.state.game}
                                enqueuePlay={this.enqueuePlay.bind(this)} />
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="section">
                    <div className="container is-fluid">
                        <div id="table" className="tile is-ancestor">
                            <Status
                                game={this.state.game}
                                enqueuePlay={this.enqueuePlay.bind(this)} />
                            <Board
                                game={this.state.game}
                                    enqueuePlay={this.enqueuePlay.bind(this)} />
                            <Controls
                                game={this.state.game}
                                    enqueuePlay={this.enqueuePlay.bind(this)} />
                        </div>
                    </div>
                </section>
            );
        }
    }
}
