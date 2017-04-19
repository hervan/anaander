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

        document.removeEventListener("keypress", this.eventListener);
        this.eventListener = this.eventListener.bind(this);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        switch (event.key) {

            case "q":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.hold
            });

            break;

            case "w":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.up
            });

            break;

            case "e":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.explore
            });

            break;

            case "a":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.left
            });

            break;

            case "s":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.down
            });

            break;

            case "d":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.right
            });

            break;

            case " ":

            this.props.enqueuePlay({
                mode: Mode.play,
                team: this.props.game.currentPlayer,
                from: "player",
                action: Action.skip
            });

            break;

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

    componentDidUpdate(prevProps: IProps): void {

        if (prevProps.game.mode !== Mode.end && this.props.game.mode === Mode.end) {

            window.clearTimeout(this.refresher);
            this.animateEnding = this.animateEnding.bind(this);
            this.refresher = window.setTimeout(this.animateEnding, 300);
        }
    }

    componentWillUnmount(): void {

        window.clearTimeout(this.refresher);
        document.removeEventListener("keypress", this.eventListener);
    }

    animateEnding(): void {

        if (this.props.game.mode === Mode.end) {

            let repetitions = 5;

            const currentPlayerMeeples: Meeple[] = this.props.game.meeples
                .filter((meeple) => meeple.key !== -1 &&
                    meeple.team === this.props.game.currentPlayer);

            if (currentPlayerMeeples.length > 0) {

                const weights: number[] = currentPlayerMeeples
                    .map((meeple) => [
                        (meeple.position.row + 1) / (this.props.game.boardSize + 1),
                        (meeple.position.col + 1) / (this.props.game.boardSize + 1),
                        (this.props.game.boardSize - meeple.position.row) / (this.props.game.boardSize + 1),
                        (this.props.game.boardSize - meeple.position.col) / (this.props.game.boardSize + 1)
                    ])
                    .reduce((acc, positions) =>
                        positions.map((position, i) =>
                            acc[i] + (position / currentPlayerMeeples.length)),
                        [0, 0, 0, 0]);

                const probabilities = weights.map((weight, i) =>
                    weight * Math.max(weight, weights[(i + 2) % 4]) / Math.min(weight, weights[(i + 2) % 4]));

                const weight = (Math.max(weights[0], weights[2]) / Math.min(weights[0], weights[2]))
                    + (Math.max(weights[1], weights[3]) / Math.min(weights[1], weights[3]));

                let rollNumber: number = Math.random() * weight;
                let roll: number = 0;

                while (rollNumber > 0) {

                    rollNumber -= probabilities[roll++];
                }

                const action: Action = roll - 1;

                repetitions = Math.random() * weights[action] * 16;

                const nextPlay: Play[] = [];

                for (let i: number = 0; i < repetitions; i++) {

                    if (Math.random() < (1 / repetitions)) {

                        this.props.enqueuePlay({
                            mode: this.props.game.mode,
                            team: this.props.game.currentPlayer,
                            from: "player",
                            action: Action.explore
                        });
                    } else {

                        this.props.enqueuePlay({
                            mode: this.props.game.mode,
                            team: this.props.game.currentPlayer,
                            from: "player",
                            action: action
                        });
                    }
                }

            } else {

                this.props.enqueuePlay({
                    mode: this.props.game.mode,
                    team: this.props.game.currentPlayer,
                    from: "player",
                    action: Action.skip
                });
            }

            window.clearTimeout(this.refresher);
            this.refresher = window.setTimeout(this.animateEnding, 85 * repetitions);
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
