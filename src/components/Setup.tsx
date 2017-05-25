// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Play,
    Team
} from "../logic/Game";

import { Control } from "Table";

interface IProps {
    game: Game;
    playerCount: number;
    computerCount: number;
    boardSize: number;
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

            case "q":

            this.props.setup("-player");

            break;

            case "w":

            this.props.setup("rearrange");

            break;

            case "e":

            this.props.setup("+player");

            break;

            case "a":

            this.props.setup("-computer");

            break;

            case "s":

            this.props.setup("rearrange");

            break;

            case "d":

            this.props.setup("+computer");

            break;

            case "z":

            this.props.setup("-size");

            break;

            case "x":

            this.props.setup("rearrange");

            break;

            case "c":

            this.props.setup("+size");

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
            <div>
                <p>
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("-player")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("rearrange")}>
                        {this.props.playerCount}
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("+player")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                    &nbsp;
                    human players
                </p>
                <p>
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("-computer")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("rearrange")}>
                        {this.props.computerCount}
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("+computer")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                    &nbsp;
                    automatic players
                </p>
                <p>
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("-size")}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("rearrange")}>
                        {this.props.boardSize}
                    </a>
                    &nbsp;
                    <a style={{textDecoration: "none"}} onClick={() => this.props.setup("+size")}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                    &nbsp;
                    board size
                </p>
            </div>;
        guideDetail =
            <p>
                click <a onClick={() => this.props.setup("begin")}>here</a> to begin.
                <br />
                (or click <a onClick={() => this.props.setup("tutorial")}>here</a> for a short tutorial.)
            </p>;

        return (
            <div className="notification">
                <h1 className="title is-2">anaander</h1>
                <h2 className="is-2">
                    {guide}
                </h2>
                <span>
                    {guideDetail}
                </span>
            </div>
        );
    }
}
