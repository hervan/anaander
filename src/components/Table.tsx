import * as React from "react";

import { Game, Play, setup, play } from "../Game";

import Status from "./Status";
import Board from "./Board";
import Controls from "./Controls";

interface IState {
    game: Game;
    moveClick: (move: Play) => void;
};

export interface IProps {
    game: Game;
    moveClick: (move: Play) => void;
};

export class Table extends React.Component<{}, IState> {

    state: IState;

    constructor() {

        super();
        this.state = { game: setup(0), moveClick: this.moveClick.bind(this) };

        document.addEventListener("keypress", (event) => {

            switch (event.key) {

                case "q":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "guard"
                    });

                    break;

                case "w":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "up"
                    });

                    break;

                case "e":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "attack"
                    });

                    break;

                case "a":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "left"
                    });

                    break;

                case "s":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "down"
                    });

                    break;

                case "d":

                    this.state.moveClick({
                        state: this.state.game.state,
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: "right"
                    });

                    break;

                case " ":

                    this.state.moveClick({
                        state: "play",
                        player: this.state.game.currentPlayer,
                        from: "player",
                        action: null
                    });

                    break;
            }
        });
    }

    moveClick(move: Play): void {

        switch (move.state) {

            case "setup":

                const change: number =
                    (move.action === "right" && this.state.game.players.length < 5 ? 1 : 0)
                    + (move.action === "left" && this.state.game.players.length > 0 ? -1 : 0);

                this.setState({ game: setup(this.state.game.players.length + change), moveClick: this.moveClick.bind(this) });

                break;

            case "play":

                const gameStep: Game = play(this.state.game, move);
                this.setState({ game: gameStep, moveClick: this.moveClick.bind(this) });

                break;
        }
    }

    render(): JSX.Element {
        return (
            <section className="section">
                <div className="container is-fluid">
                    <div id="table" className="tile is-ancestor">
                        <Status game={this.state.game} moveClick={this.state.moveClick} />
                        <Board game={this.state.game} moveClick={this.state.moveClick} />
                        <Controls game={this.state.game} moveClick={this.state.moveClick} />
                    </div>
                </div>
            </section>
        );
    }
}
