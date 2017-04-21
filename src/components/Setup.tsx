// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Play,
    Team
} from "../Game";

import { Control } from "Table";

interface IProps {
    game: Game;
    setup: (control: Control) => void;
};

export default class Setup extends React.Component<IProps, {}> {

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        switch (event.key) {

            case "a":

            this.props.setup("-player");

            break;

            case "s":

            this.props.setup("setup");

            break;

            case "d":

            this.props.setup("+player");

            break;

            case "q":

            this.props.setup("-computer");

            break;

            case "e":

            this.props.setup("+computer");

            break;

            case " ":

            this.props.setup("begin");

            break;

            case "/":
            case "?":

            this.props.setup("tutorial");

            break;
        }
    }

    componentWillUnmount(): void {

        document.removeEventListener("keypress", this.eventListener);
    }

    render(): JSX.Element {

        let guide: JSX.Element;
        let guideDetail: JSX.Element;

        guide =
            <p>
                <p>
                    how many players?
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("-player")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("setup")}>
                        {this.props.game.players.length}
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("+player")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                </p>
                <p>
                    how many computers?
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("-computer")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("setup")}>
                        {this.props.game.players.length}
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("+computer")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                </p>
                <p>
                    how large the board?
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("-size")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("setup")}>
                        {this.props.game.players.length}
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => this.props.setup("+size")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                </p>
            </p>;
        guideDetail =
            <p>
                click <a className="is-link" onClick={() => this.props.setup("begin")}>here</a> to begin.
                <br />
                (or click <a className="is-link"
                    onClick={() => this.props.setup("begin")}>here</a> for a short tutorial.)
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
