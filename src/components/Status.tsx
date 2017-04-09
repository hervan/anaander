// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { Team } from "../Game";

import { IProps } from "./Table";

export default class Status extends React.Component<IProps, {}> {

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        if (this.props.game.state !== "end") {

            return;
        }

        switch (event.key) {

            case "/":
            case "?":

            this.props.enqueuePlay({
                state: "setup",
                player: Team.default,
                from: "player",
                action: "skip"
            });

            break;
        }
    }

    componentDidUpdate(): void {

        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    componentWillUnmount(): void {

        document.removeEventListener("keypress", this.eventListener);
    }

    render(): JSX.Element {

        let guide: JSX.Element = <br />;
        let guideDetail: JSX.Element = <br />;

        switch (this.props.game.state) {

            case "end":

            guide =
                <p>
                    general <span className={"is-" + Team[this.props.game.currentPlayer]}>
                        {Team[this.props.game.currentPlayer]}
                    </span> won the game!
                </p>;

            guideDetail =
                <p>
                    click <a className="is-link" onClick={() => this.props.enqueuePlay({
                        state: "setup",
                        player: Team.default,
                        from: "player",
                        action: "skip"
                    })}>here</a> to start a new game.
                </p>;

            break;

            default:

            guide =
                <p>
                    it's general <span className={"is-" + Team[this.props.game.currentPlayer]}>
                        {Team[this.props.game.currentPlayer]}
                    </span>'s turn.
                </p>;

            switch (this.props.game.lastAction) {

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
                            + (this.props.game.turn === "heads" ? "-o" : "")
                            + " is-" + Team[this.props.game.currentPlayer]}></i>
                    </span>;
                guideDetail = <p>choose an action for these meeples: {side}</p>;

                break;

                default:

                guideDetail = <p>{this.props.game.lastAction.explanation}</p>;

                break;
            }
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
    }
}
