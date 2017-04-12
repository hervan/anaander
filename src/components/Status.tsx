// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Meeple,
    Mode,
    Play,
    Team,
    Turn
} from "../Game";

import { IProps } from "./Table";

export default class Status extends React.Component<IProps, {}> {

    refresher: number;

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        if (this.props.game.mode !== Mode.end) {

            return;
        }

        switch (event.key) {

            case "/":
            case "?":

            this.props.enqueuePlay({
                mode: Mode.setup,
                team: Team.default,
                from: "player",
                action: null
            });

            break;
        }
    }

    componentDidUpdate(): void {

        if (this.props.game.mode === Mode.end) {

            clearInterval(this.refresher);
            this.refresher = window.setInterval(() => this.animateEnding(), 300);
        }

        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    componentWillUnmount(): void {

        clearInterval(this.refresher);
        document.removeEventListener("keypress", this.eventListener);
    }

    animateEnding(): void {

        const currentPlayerMeeples: Meeple[] = this.props.game.meeples
            .filter((meeple) => meeple.key !== -1 &&
                meeple.team === this.props.game.currentPlayer);

        if (currentPlayerMeeples.length > 0) {

            const actions: Action[] = [ Action.up, Action.left, Action.down, Action.right ];

            const weights: number[] = currentPlayerMeeples
                .map((meeple) => [
                    (meeple.position.row + 1) / (this.props.game.boardSize + 1),
                    (meeple.position.col + 1) / (this.props.game.boardSize + 1),
                    (this.props.game.boardSize - meeple.position.row) / (this.props.game.boardSize + 1),
                    (this.props.game.boardSize - meeple.position.col) / (this.props.game.boardSize + 1)
                ])
                .reduce((acc, positions) => [
                    acc[0] + (positions[0] / currentPlayerMeeples.length),
                    acc[1] + (positions[1] / currentPlayerMeeples.length),
                    acc[2] + (positions[2] / currentPlayerMeeples.length),
                    acc[3] + (positions[3] / currentPlayerMeeples.length)
                ], [0, 0, 0, 0]);

            let rollNumber: number = Math.random() * 2;
            let roll: number = 0;

            while (rollNumber > 0) {

                rollNumber -= weights[roll++];
            }

            const action: Action = actions[roll - 1];

            const repetitions: number = Math.random() * this.props.game.boardSize / 2;

            const nextPlay: Play[] = [];

            for (let i: number = 0; i < repetitions; i++) {

                this.props.enqueuePlay({
                    mode: this.props.game.mode,
                    team: this.props.game.currentPlayer,
                    from: "player",
                    action: action
                });
            }

        } else {

            this.props.enqueuePlay({
                mode: this.props.game.mode,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.skip
            });
        }
    }

    render(): JSX.Element {

        let guide: JSX.Element;
        let guideDetail: JSX.Element;

        switch (this.props.game.mode) {

            case Mode.end:

            guide =
                <p>
                    general <span className={"is-" + Team[this.props.game.currentPlayer]}>
                        {Team[this.props.game.currentPlayer]}
                    </span> won the game!
                </p>;

            guideDetail =
                <p>
                    click <a className="is-link" onClick={() => this.props.enqueuePlay({
                        mode: Mode.setup,
                        team: Team.default,
                        from: "player",
                        action: null
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

                case Action.up:
                case Action.down:
                case Action.left:
                case Action.right:
                case Action.hold:
                case Action.explore:
                case Action.skip:
                case null:

                const side: JSX.Element =
                    <span className="icon">
                        <i className={"fa fa-user-circle"
                            + (this.props.game.turn === Turn.heads ? "-o" : "")
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
