// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    GeographyInfo,
    Play,
    Player,
    Team
} from "../Game";

import { Control } from "./Table";

interface IProps {
    player: Player;
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    active: boolean;
}

const Player: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div className="player tile is-parent">
        <article className={"tile is-child message is-" + Team[props.player.team]
            + (props.active ? " current-player" : "")}
            style={{
                opacity: props.player.swarmSize === 0 ? 0.1 : 1,
                transition: "opacity 1s"
        }}>
            <div className="message-header">
                <p>
                    general {Team[props.player.team]} {props.player.swarmSize > 0 ? "" : "is dead :("}
                </p>
            </div>
            <div className="message-body">
                <div className="tile is-child">
                    <div className="field has-addons tile is-parent">
                        <div className="control tile is-child">
                            <p>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.hold)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-paper-o"></i>
                                    </span>
                                </a>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.up)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-o-up"></i>
                                    </span>
                                </a>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.explore)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-rock-o"></i>
                                    </span>
                                </a>
                            </p>
                            <p>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.left)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-o-left"></i>
                                    </span>
                                </a>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.down)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-o-down"></i>
                                    </span>
                                </a>
                                <a className={"button is-outlined is-" + Team[props.player.team]}
                                    onClick={() => props.enqueuePlay(props.player.team, Action.right)}>
                                    <span className="icon is-small">
                                        <i className="fa fa-hand-o-right"></i>
                                    </span>
                                </a>
                            </p>
                        </div>
                        <div className="tile is-child">
                            <p>
                                <a className={"button is-" + Team[props.player.team]
                                    + " is-outlined"}
                                    style={{ textDecoration: "none" }}>
                                    <span className="icon is-small">
                                        <i className="fa fa-users fa-fw"></i>
                                    </span>
                                    <span>{props.player.swarmSize}</span>
                                </a>
                            </p>
                            <p>
                                <a className={"button is-" + Team[props.player.team]
                                    + " is-outlined"}
                                    disabled={props.player.cities - props.player.usedActions < 0}
                                    style={{ textDecoration: "none" }}>
                                    <span className="icon is-small">
                                        <i className="fa fa-user fa-fw"></i>
                                    </span>
                                    <span>{props.player.cities - props.player.usedActions + 1}</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="field has-addons tile is-parent">
                        <div className="control tile is-child">
                            <p>
                                {GeographyInfo.filter(({type, piece}) => piece !== null)
                                    .map(({ type, piece }, i) =>
                                    <a key={i}
                                        className={"button is-" + Team[props.player.team]
                                        + " is-outlined"}
                                        disabled={!props.player.blueprints[i]}>
                                        <span className="icon">
                                            <span className="fa artifact">{piece}</span>
                                        </span>
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>;

export default Player;
