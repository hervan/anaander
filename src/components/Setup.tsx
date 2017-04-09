// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { Team } from "../Game";

import { IProps } from "./Table";

export default class Setup extends React.Component<IProps, {}> {

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        if (this.props.game.state !== "setup") {

            return;
        }

        switch (event.key) {

            case "a":

            this.props.enqueuePlay({
                state: "setup",
                player: Team.default,
                from: "player",
                action: "left"
            });

            break;

            case "s":

            this.props.enqueuePlay({
                state: "setup",
                player: Team.default,
                from: "player",
                action: "down"
            });

            break;

            case "d":

            this.props.enqueuePlay({
                state: "setup",
                player: Team.default,
                from: "player",
                action: "right"
            });

            break;

            case " ":

            this.props.enqueuePlay({
                state: "play",
                player: Team.default,
                from: "player",
                action: "skip"
            });

            break;

            case "/":
            case "?":

            this.props.enqueuePlay({
                state: "tutorial",
                player: Team.default,
                from: "player",
                action: { step: 0 }
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

        guide =
            <p>
                how many players?
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    state: "setup",
                    player: Team.default,
                    from: "player",
                    action: "left"
                })}>
                    <span className="icon">
                        <i className="fa fa-minus"></i>
                    </span>
                </a>
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    state: "setup",
                    player: Team.default,
                    from: "player",
                    action: null
                })}>
                    {this.props.game.players.length}
                </a>
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    state: "setup",
                    player: Team.default,
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
                click <a className="is-link" onClick={() => this.props.enqueuePlay({
                    state: "play",
                    player: Team.default,
                    from: "player",
                    action: null
                })}>here</a> to begin.
                <br />
                (or click <a className="is-link" onClick={() => this.props.enqueuePlay({
                    state: "tutorial",
                    player: Team.default,
                    from: "player",
                    action: { step: 0 }
                })}>here</a> for a short tutorial.)
            </p>;

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
