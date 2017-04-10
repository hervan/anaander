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

        if (this.props.game.mode !== "setup") {

            return;
        }

        switch (event.key) {

            case "a":

            this.props.enqueuePlay({
                mode: "setup",
                player: Team.default,
                from: "player",
                action: "left"
            });

            break;

            case "s":

            this.props.enqueuePlay({
                mode: "setup",
                player: Team.default,
                from: "player",
                action: "down"
            });

            break;

            case "d":

            this.props.enqueuePlay({
                mode: "setup",
                player: Team.default,
                from: "player",
                action: "right"
            });

            break;

            case " ":

            if (this.props.game.players.length > 0) {

                this.props.enqueuePlay({
                    mode: "play",
                    player: Team.default,
                    from: "player",
                    action: "skip"
                });
            }

            break;

            case "/":
            case "?":

            this.props.enqueuePlay({
                mode: "tutorial",
                player: Team.default,
                from: "player",
                action: {
                    index: 0,
                    step: -1,
                    autoplay: true
                }
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

        let guide: JSX.Element;
        let guideDetail: JSX.Element;

        guide =
            <p>
                how many players?
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: "setup",
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
                    mode: "setup",
                    player: Team.default,
                    from: "player",
                    action: "skip"
                })}>
                    {this.props.game.players.length}
                </a>
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: "setup",
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
                    mode: "play",
                    player: Team.default,
                    from: "player",
                    action: null
                })}>here</a> to begin.
                <br />
                (or click <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: "tutorial",
                    player: Team.default,
                    from: "player",
                    action: {
                        index: 0,
                        step: -1,
                        autoplay: true
                    }
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
