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
                        action: "attack"
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

                    this.playEvent({
                        state: "play",
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: null
                    });

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
                        (playData.action === "right" && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === "left" && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({ game: setup(this.state.game.players.length + change), playQueue: [] });

                    break;

                case "play":

                    const gameStep: Game = play(this.state.game, playData);
                    this.setState({ game: gameStep, playQueue: queue });

                    break;
            }
        }

        if (this.refresher === 0 && this.state.game.state === "end") {

            this.refresher = window.setInterval(
                () => this.refresh(),
                150
            );
        }
    }

    componentWillUnmount(): void {

        clearInterval(this.refresher);
        this.refresher = 0;
    }

    refresh(): void {

        const queue: Play[] = this.state.playQueue;

        if (this.state.game.state === "end" && queue.length === 0) {

            const dirs: Direction[] = [ "up", "left", "down", "right" ];
            const dir: Direction = dirs[Math.floor(Math.random() * dirs.length)];

            for (let i: number = 0; i < Math.random() * this.state.game.boardSize / 2; i++) {

                queue.push({
                    state: "play",
                    player: this.state.game.currentPlayer,
                    from: "player",
                    action: dir
                });
            }

            this.setState({ playQueue: queue });
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
