// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Mode,
    Play,
    Team
} from "../Game";

interface IProps {
    game: Game;
    enqueuePlay: (play: Play, lesson?: { index: number }) => void;
};

export default class Setup extends React.Component<IProps, {}> {

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        if (this.props.game.mode !== Mode.setup) {

            return;
        }

        switch (event.key) {

            case "a":

            this.props.enqueuePlay({
                mode: Mode.setup,
                team: Team.default,
                from: "player",
                action: Action.left
            });

            break;

            case "s":

            this.props.enqueuePlay({
                mode: Mode.setup,
                team: Team.default,
                from: "player",
                action: Action.down
            });

            break;

            case "d":

            this.props.enqueuePlay({
                mode: Mode.setup,
                team: Team.default,
                from: "player",
                action: Action.right
            });

            break;

            case " ":

            if (this.props.game.players.length > 0) {

                this.props.enqueuePlay({
                    mode: Mode.play,
                    team: Team.default,
                    from: "player",
                    action: Action.skip
                });
            }

            break;

            case "/":
            case "?":

            this.props.enqueuePlay({
                mode: Mode.tutorial,
                team: Team.default,
                from: "player",
                action: null
            }, { index: 0 });

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
                how many players?
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: Mode.setup,
                    team: Team.default,
                    from: "player",
                    action: Action.left
                })}>
                    <span className="icon">
                        <i className="fa fa-minus"></i>
                    </span>
                </a>
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: Mode.setup,
                    team: Team.default,
                    from: "player",
                    action: Action.skip
                })}>
                    {this.props.game.players.length}
                </a>
                &nbsp;
                <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: Mode.setup,
                    team: Team.default,
                    from: "player",
                    action: Action.right
                })}>
                    <span className="icon">
                        <i className="fa fa-plus"></i>
                    </span>
                </a>
            </p>;
        guideDetail =
            <p>
                click <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: Mode.play,
                    team: Team.default,
                    from: "player",
                    action: null
                })}>here</a> to begin.
                <br />
                (or click <a className="is-link" onClick={() => this.props.enqueuePlay({
                    mode: Mode.tutorial,
                    team: Team.default,
                    from: "player",
                    action: null
                }, { index: 0 })}>here</a> for a short tutorial.)
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
