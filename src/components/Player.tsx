// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Game from "../Game";

interface IProps {
    player: Game.Player;
    enqueuePlay: (move: Game.Play) => void;
    active: boolean;
}

export default class Player extends React.Component<IProps, {}> {

    constructor(props: IProps) {

        super(props);
        this.eventListener = this.eventListener.bind(this);
        document.removeEventListener("keypress", this.eventListener);
        document.addEventListener("keypress", this.eventListener);
    }

    eventListener(event: KeyboardEvent): void {

        if (!this.props.active) {

            return;
        }

        switch (event.key) {

            case "q":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "hold"
            });

            break;

            case "w":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "up"
            });

            break;

            case "e":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "explore"
            });

            break;

            case "a":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "left"
            });

            break;

            case "s":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "down"
            });

            break;

            case "d":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
                from: "player",
                action: "right"
            });

            break;

            case " ":

            this.props.enqueuePlay({
                state: "play",
                player: this.props.player.team,
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

        return (
            <div className="player tile is-parent">
                <article className={"tile is-child message is-" + Game.Team[this.props.player.team]
                    + (this.props.active ? " current-player" : "")}
                    style={{
                        opacity: this.props.player.swarmSize === 0 ? 0.1 : 1,
                        transition: "opacity 1s"
                }}>
                    <div className="message-header">
                        <p>general {Game.Team[this.props.player.team]}</p>
                    </div>
                    <div className="message-body">
                        <div className="field has-addons tile is-parent">
                            <div className="control tile is-child">
                                <p>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "hold"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-paper-o"></i>
                                        </span>
                                    </a>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "up"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-o-up"></i>
                                        </span>
                                    </a>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "explore"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-rock-o"></i>
                                        </span>
                                    </a>
                                </p>
                                <p>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "left"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-o-left"></i>
                                        </span>
                                    </a>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "down"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-o-down"></i>
                                        </span>
                                    </a>
                                    <a className={"button is-outlined is-" + Game.Team[this.props.player.team]}
                                        onClick={() => this.props.enqueuePlay({
                                        state: "play",
                                        player: this.props.player.team,
                                        from: "player",
                                        action: "right"
                                    })}>
                                        <span className="icon is-small">
                                            <i className="fa fa-hand-o-right"></i>
                                        </span>
                                    </a>
                                </p>
                            </div>
                            <div className="tile is-child">
                                <p title="if you lose\nall your meeples\nyou're dead.">
                                    swarm: {this.props.player.swarmSize} meeple
                                    {this.props.player.swarmSize !== 1 ? "s" : ""}
                                </p>
                                <p title={
                                    "individual actions to be performed\n\
                                    before or after your swarm action\n\
                                    on available meeples."
                                }>
                                    actions: {this.props.player.individualActions}
                                </p>
                                <p>{this.props.player.swarmSize > 0 ? "" : "you died :("}</p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
