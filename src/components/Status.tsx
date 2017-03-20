// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { IProps } from "./Table";

export default (props: IProps) => {

    let guide: JSX.Element = <div />;

    switch (props.game.state) {

        case "setup":

            guide =
            <p>
                how many players?
                &nbsp;
                <a className="is-link" onClick={() => props.moveClick({
                    state: "setup",
                    player: "default",
                    from: "player",
                    action: "down"
                })}>
                    <span className="icon">
                        <i className="fa fa-minus"></i>
                    </span>
                </a>
                &nbsp;
                {props.game.players.length}
                &nbsp;
                <a className="is-link" onClick={() => props.moveClick({
                    state: "setup",
                    player: "default",
                    from: "player",
                    action: "up"
                })}>
                    <span className="icon">
                        <i className="fa fa-plus"></i>
                    </span>
                </a>
                <br />
                <a className="is-link" onClick={() => props.moveClick({
                    state: "play",
                    player: "default",
                    from: "player",
                    action: null
                })}>
                    click here to begin.
                </a>
            </p>;

            break;

        case "play":

            let guide_detail: string;

            switch (props.game.lastAction) {

                case "up":
                case "down":
                case "left":
                case "right":
                case "attack":
                case "guard":
                case "explore":
                case "convert":
                case "skip":
                case null:

                    guide_detail = "choose an action for all your pieces with side " + props.game.turn + " up.";
                    break;

                default:

                    guide_detail = props.game.lastAction.explanation;
                    break;
            }

            guide =
            <p>
                it's <span className={"is-" + props.game.currentPlayer}>general {props.game.currentPlayer}</span>'s turn.
                <br />
                {guide_detail}
            </p>;

            break;

        case "end":

            guide =
            <p>
                general {props.game.currentPlayer} won the game!
            </p>;

            break;
    };

    return (
        <section id="status" className="hero is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">anaander</h1>
                    <h2 className="subtitle">
                        {guide}
                    </h2>
                </div>
            </div>
        </section>
    );
};
