// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { IProps } from "./Table";

const Status: ((props: IProps) => JSX.Element) = (props: IProps) => {

    let guide: JSX.Element = <br />;
    let guide_detail: JSX.Element = <br />;

    switch (props.game.state) {

        case "setup":

            guide =
                <p>
                    how many players?
                    &nbsp;
                    <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "left"
                    })}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: null
                    })}>
                        {props.game.players.length}
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "right"
                    })}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                </p>;
            guide_detail =
                <p>
                    click <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "play",
                        player: "default",
                        from: "player",
                        action: null
                    })}>here</a> to begin.
                    <br />
                    (or click <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "tutorial",
                        player: "default",
                        from: "player",
                        action: null
                    })}>here</a> for a short tutorial.)
                </p>;

            break;

        case "play":

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
                    guide_detail = <p>choose an action for these meeples: {side}</p>;
                    break;

                default:

                    guide_detail = <p>{props.game.lastAction.explanation}</p>;
                    break;
            }

            guide =
                <p>
                    it's <span className={"is-" + props.game.currentPlayer}>general {props.game.currentPlayer}</span>'s turn.
                </p>;

            break;

        case "end":

            guide =
                <p>
                    <span className={"is-" + props.game.currentPlayer}>general {props.game.currentPlayer}</span> won the game!
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
                <span>
                    {guide_detail}
                </span>
            </div>
        </div>
    );
};

export default Status;
