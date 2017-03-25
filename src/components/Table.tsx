import * as React from "react";

import { Game, Play, Direction, setup, play } from "../Game";

import Tutorial from "./Tutorial";
import Status from "./Status";
import Board from "./Board";
import Controls from "./Controls";

interface IState {
    game: Game;
    playQueue: Play[];
    playEvent: (play: Play) => void;
};

export interface IProps {
    game: Game;
    playEvent: (play: Play) => void;
};

export class Table extends React.Component<{}, IState> {

    state: IState;
    refresher: number;

    constructor() {

        super();
        this.state = { game: setup(0), playQueue: [], playEvent: this.playEvent.bind(this) };
        this.refresher = 0;

        document.addEventListener("keypress", (event) => {

            switch (event.key) {

                case "q":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "guard"
                    });

                    break;

                case "w":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "up"
                    });

                    break;

                case "e":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "explore"
                    });

                    break;

                case "a":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "left"
                    });

                    break;

                case "s":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "down"
                    });

                    break;

                case "d":

                    this.playEvent({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "right"
                    });

                    break;

                case " ":

                    if (this.state.game.state === "tutorial") {

                        this.playEvent({
                            state: "tutorial",
                            player: this.state.game.currentPlayer,
                            from: "player",
                            action: "skip"
                        });
                    } else {

                        this.playEvent({
                            state: "play",
                            player: this.state.game.currentPlayer,
                            from: "player",
                            action: null
                        });
                    }

                    break;
            }
        });
    }

    playEvent(play: Play): void {

        const queue: Play[] = this.state.playQueue;
        queue.push(play);

        this.setState({ playQueue: queue });
    }

    componentDidUpdate(): void {

        const queue: Play[] = this.state.playQueue;

        if (queue.length > 0) {

            const playData: Play = queue.shift() as Play;

            switch (playData.state) {

                case "setup":

                    const change: number =
                        (playData.action === "skip" ? 0 : this.state.game.players.length)
                        + (playData.action === "right" && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === "left" && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({ game: setup(change), playQueue: [] });

                    this.componentWillUnmount();

                    break;

                case "play":

                    const gameStep: Game = play(this.state.game, playData);
                    this.setState({ game: gameStep, playQueue: queue });

                    break;

                case "tutorial":

                    if (playData.action === null) {

                        this.setState({ game: setup(5, undefined, true), playQueue: [] });
                        this.componentWillUnmount();
                    }

                    break;
            }
        }

        if (this.refresher === 0) {

            switch (this.state.game.state) {

                case "end":

                    this.refresher = window.setInterval(
                        () => this.refresh(),
                        150
                    );

                    break;

                case "tutorial":

                    this.refresher = window.setInterval(
                        () => this.refresh(),
                        2000
                    );

                    break;
            }
        }
    }

    componentWillUnmount(): void {

        clearInterval(this.refresher);
        this.refresher = 0;
    }

    autoplay(): void {

        const queue: Play[] = this.state.playQueue;

        const winnerMeeples = this.state.game.meeples
            .filter((meeple) => meeple.key !== -1 &&
                meeple.team === this.state.game.currentPlayer);

        if (winnerMeeples.length > 0) {

            const dirs: Direction[] = [ "up", "left", "down", "right" ];

            const weights: number[] = winnerMeeples
                .map((meeple) => [
                    (meeple.position.row + 1) / (this.state.game.boardSize + 1),
                    (meeple.position.col + 1) / (this.state.game.boardSize + 1),
                    (this.state.game.boardSize - meeple.position.row) / (this.state.game.boardSize + 1),
                    (this.state.game.boardSize - meeple.position.col) / (this.state.game.boardSize + 1)
                ])
                .reduce((acc, positions) => [
                    acc[0] + (positions[0] / winnerMeeples.length),
                    acc[1] + (positions[1] / winnerMeeples.length),
                    acc[2] + (positions[2] / winnerMeeples.length),
                    acc[3] + (positions[3] / winnerMeeples.length)
                ], [0, 0, 0, 0]);

            let rollNumber = Math.random() * 2;
            let roll = 0;

            while (rollNumber > 0) {

                rollNumber -= weights[roll++];
            }

            const dir: Direction = dirs[roll - 1];

            for (let i: number = 0; i < Math.random() * this.state.game.boardSize / 2; i++) {

                queue.push({
                    state: "play", //this.state.game.state,
                    player: this.state.game.currentPlayer,
                    from: "player",
                    action: dir
                });
            }
        } else {

            queue.push({
                state: "play", //this.state.game.state,
                player: this.state.game.currentPlayer,
                from: "player",
                action: "skip"
            });
        }
        this.setState({ playQueue: queue });
    }

    refresh(): void {

        if ((this.state.game.state === "end" || this.state.game.state === "tutorial")
            && this.state.playQueue.length === 0) {

            this.autoplay();
        }
    }

    render(): JSX.Element {

        if (this.state.game.state === "tutorial") {
            return (
                <section className="section">
                    <div className="container is-fluid">
                        <div id="table" className="tile is-ancestor">
                            <Tutorial game={this.state.game} playEvent={this.state.playEvent} />
                            <Board game={this.state.game} playEvent={this.state.playEvent} />
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="section">
                    <div className="container is-fluid">
                        <div id="table" className="tile is-ancestor">
                            <Status game={this.state.game} playEvent={this.state.playEvent} />
                            <Board game={this.state.game} playEvent={this.state.playEvent} />
                            <Controls game={this.state.game} playEvent={this.state.playEvent} />
                        </div>
                    </div>
                </section>
            );
        }
    }
}
