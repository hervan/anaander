// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { IProps } from "./Table";

const Status: ((props: IProps) => JSX.Element) = (props: IProps) => {

    let guide: JSX.Element = <br />;
    let guideDetail: JSX.Element = <br />;

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
        guideDetail =
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
                    action: { step: 0 }
                })}>here</a> for a short tutorial.)
            </p>;

        break;

        case "play":

        switch (props.game.lastAction) {

            case "up":
            case "down":
            case "left":
            case "right":
            case "hold":
            case "explore":
            case "skip":
            case "random":
            case "stop":
            case null:

            const side: JSX.Element =
                <span className="icon">
                    <i className={"fa fa-user-circle"
                        + (props.game.turn === "heads" ? "-o" : "")
                        + " is-" + props.game.currentPlayer}></i>
                </span>;
            guideDetail = <p>choose an action for these meeples: {side}</p>;
            break;

            default:

            guideDetail = <p>{props.game.lastAction.explanation}</p>;
            break;
        }

        guide =
            <p>
                it's general <span className={"is-" + props.game.currentPlayer}>
                    {props.game.currentPlayer}
                </span>'s turn.
            </p>;

        break;

        case "end":

        guide =
            <p>
                general <span className={"is-" + props.game.currentPlayer}>
                    {props.game.currentPlayer}
                </span> won the game!
            </p>;

        break;
    }

    return (
        <div id="status" className="tile is-3 is-parent">
            <div className="notification tile is-child">
                <h1 className="title is-2">anaander</h1>
                <h2 className="subtitle is-4">
                    {guide}
                </h2>
                <span>
                    {guideDetail}
                </span>
            </div>
        </div>
    );
};

export default Status;
