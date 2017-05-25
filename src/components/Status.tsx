// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Meeple,
    Outcome,
    Play,
    Position,
    Side,
    Team
} from "../logic/Game";

import {
    Control,
    Mode
} from "./Table";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
    game: Game;
    mode: Mode;
};

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

            this.props.enqueuePlay(this.props.game.turn.team, Action.hold);

            break;

            case "w":

            this.props.enqueuePlay(this.props.game.turn.team, Action.up);

            break;

            case "e":

            this.props.enqueuePlay(this.props.game.turn.team, Action.explore);

            break;

            case "a":

            this.props.enqueuePlay(this.props.game.turn.team, Action.left);

            break;

            case "s":

            this.props.enqueuePlay(this.props.game.turn.team, Action.down);

            break;

            case "d":

            this.props.enqueuePlay(this.props.game.turn.team, Action.right);

            break;

            case "/":
            case "?":

            this.props.setup("setup");

            break;
        }
    }

    componentDidUpdate(prevProps: IProps): void {

        if (prevProps.mode !== Mode.end && this.props.mode === Mode.end) {

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

        if (this.props.mode === Mode.end) {

            let repetitions = 5;

            const currentPlayerMeeples: Meeple[] = this.props.game.meeples
                .filter((meeple) => meeple.key !== -1
                    && meeple.team === this.props.game.turn.team
                    && meeple.side === this.props.game.turn.side);

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

                repetitions = Math.random() * weights[action] * 20;

                const nextPlay: Play[] = [];

                for (let i: number = 0; i < repetitions; i++) {

                    if (Math.random() < (1 / repetitions)) {

                        this.props.select(this.props.game.meeples
                            .find((meeple) => meeple.team === this.props.game.turn.team
                                && meeple.side === this.props.game.turn.side)!.position);
                        this.props.enqueuePlay(this.props.game.turn.team, Action.explore);
                    } else {

                        this.props.select(this.props.game.meeples
                            .find((meeple) => meeple.team === this.props.game.turn.team
                                && meeple.side === this.props.game.turn.side)!.position);
                        this.props.enqueuePlay(this.props.game.turn.team, action);
                    }
                }
            }

            window.clearTimeout(this.refresher);
            this.refresher = window.setTimeout(this.animateEnding, 85 * repetitions);
        }
    }

    render(): JSX.Element {

        let guide: JSX.Element;
        let guideDetail: JSX.Element;

        if (this.props.mode === Mode.end) {

            guide =
                <p>
                    general <span className={"is-" + Team[this.props.game.turn.team]}>
                        {Team[this.props.game.turn.team]}
                    </span> won the game!
                </p>;

            guideDetail =
                <p>
                    click <a className="is-link" onClick={() => this.props.setup("setup")}>here</a> to play a new game.
                </p>;

        } else {

            guide =
                <p>
                    it's general <span className={"is-" + Team[this.props.game.turn.team]}>
                        {Team[this.props.game.turn.team]}
                    </span>'s turn.
                </p>;

            let outcome: Outcome = this.props.game.outcome[0];

            switch (outcome.type) {

                case "invalid":

                guideDetail = <p>{outcome.explanation}</p>;

                break;

                case "action":
                case "none":
                default:

                const side: JSX.Element =
                    <span className="icon">
                        <i className={"fa fa-user-circle"
                            + (this.props.game.turn.side === Side.heads ? "-o" : "")
                            + " is-" + Team[this.props.game.turn.team]}></i>
                    </span>;
                guideDetail = <p>choose an action for these meeples: {side}</p>;

                break;
            }
        }

        return (
            <div className="notification">
                <h1 className="title is-2">anaander</h1>
                <h2 className="subtitle is-4">
                    {guide}
                </h2>
                <span>
                    {guideDetail}
                </span>
            </div>
        );
    }
}
