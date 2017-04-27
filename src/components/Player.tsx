// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    GeographyItem,
    Item,
    Play,
    Player,
    PlayType,
    Team
} from "../Game";

import { Control } from "./Table";

interface IProps {
    player: Player;
    setup: (control: Control, item?: Item) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    active: boolean;
    playType: PlayType;
    selectedItem: Item;
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
                            <p title="if you lose\nall your meeples\nyou're dead.">
                                <a className={"button is-" + Team[props.player.team]
                                    + (props.active && props.playType === "swarm" ?
                                    " is-active" : " is-outlined")}
                                    style={{ textDecoration: "none" }}
                                    onClick={() => props.setup("swarm")}>
                                    <span className="icon is-small">
                                        <i className="fa fa-users fa-fw"></i>
                                    </span>
                                    <span>{props.player.swarmSize}</span>
                                </a>
                            </p>
                            <p title={"actions to be assigned to individual\n"
                                    + "meeples whenever they're available.\n"
                                    + "every turn you can do it a number of times\n"
                                    + "equal to the number of cities you control."}>
                                <a className={"button is-" + Team[props.player.team]
                                    + (props.active && props.playType === "individual" ?
                                    " is-active" : " is-outlined")}
                                    disabled={props.player.individualActions <= 0}
                                    style={{ textDecoration: "none" }}
                                    onClick={() => props.setup("individual")}>
                                    <span className="icon is-small">
                                        <i className="fa fa-user fa-fw"></i>
                                    </span>
                                    <span>{props.player.individualActions}</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="field has-addons tile is-parent">
                        <div className="control tile is-child">
                            <p>
                                {GeographyItem.map(({ type, item, piece }, i) =>
                                    <a key={i}
                                        className={"button is-" + Team[props.player.team]
                                        + (props.active && props.playType === "pattern"
                                        && props.selectedItem
                                        && props.selectedItem === item ? " is-active" : " is-outlined")}
                                        title={type}
                                        disabled={!props.player.items[i]}
                                        onClick={() => props.setup("pattern", item!)}>
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
