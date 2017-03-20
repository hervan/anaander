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

            let guide_detail: JSX.Element;

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

                    const side: JSX.Element =
                        <span className="icon">
                            <i className={"fa fa-user-circle"
                                + (props.game.turn === "heads" ? "-o" : "")
                                + " is-" + props.game.currentPlayer}></i>
                        </span>;
                    guide_detail =
                        <span>choose an action for these meeples: {side}</span>;
                    break;

                default:

                    guide_detail = <span>{props.game.lastAction.explanation}</span>;
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
        <div id="status" className="tile is-3 is-parent">
            <div className="notification tile is-child">
                <h1 className="title">anaander</h1>
                <h2 className="subtitle">
                    {guide}
                </h2>
            </div>
        </div>
    );
};
