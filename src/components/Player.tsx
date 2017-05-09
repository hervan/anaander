// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    City,
    GeographyInfo,
    Meeple,
    Play,
    Player,
    Position,
    Side,
    Team
} from "../Game";

import { Control } from "./Table";

interface IProps {
    player: Player;
    swarm: Meeple[];
    empire: City[];
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
    selection: number[];
    active: boolean;
}

const Player: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div className={"player is-" + Team[props.player.team]}
        style={{
            opacity: props.player.swarmSize === 0 ? 0.1 : 1,
            transition: "opacity 1s"}}>
        <div>
            general {Team[props.player.team]} {props.player.swarmSize > 0 ? "" : "is dead :("}
        </div>
        <div>
            <div className="player-view">
                <div className="player-actions">
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.hold)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-paper-o"></i>
                        </span>
                    </a>
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.up)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-o-up"></i>
                        </span>
                    </a>
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.explore)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-rock-o"></i>
                        </span>
                    </a>
                </div>
                <div className="player-actions">
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.left)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-o-left"></i>
                        </span>
                    </a>
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.down)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-o-down"></i>
                        </span>
                    </a>
                    <a className={"button is-large is-outlined is-" + Team[props.player.team]}
                        style={{ borderColor: "transparent" }}
                        onClick={() => props.enqueuePlay(props.player.team, Action.right)}>
                        <span className="icon is-large">
                            <i className="fa fa-hand-o-right"></i>
                        </span>
                    </a>
                </div>
            </div>
            <div className="meeple-view">
                {props.swarm
                    .map((meeple) =>
                        <div key={meeple.key} style={{ display: "inline-block"}}>
                            <a onClick={() => props.select(meeple.position)}
                                className="button is-large is-outlined"
                                style={{ textDecoration: "none", borderColor: "transparent" }}>
                                <span className={"icon is-large"
                                    + (props.selection.some((meepleKey) => meeple.key === meepleKey) ? " selected" : "")
                                    + " is-" + Team[meeple.team]}
                                    style={{ opacity: 0.5 + (meeple.resistance / 20) }}>
                                    <i className={"fa fa-user-circle" + (meeple.side === Side.heads ? "-o" : "")}>
                                    </i>
                                </span>
                            </a>
                            <div className="meeple-stats">
                                <div>
                                    ⚔️{meeple.strength}
                                </div>
                                <div>
                                    🛡{meeple.resistance}
                                </div>
                                <div>
                                    🙏{meeple.faith}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="cities-view">
                {props.empire
                    .map((city) =>
                        <div key={city.key} style={{ display: "inline-block"}}>
                            <a className="button is-large is-outlined"
                                style={{ textDecoration: "none", borderColor: "transparent" }}>
                                <span className={"icon is-large"
                                    + " is-" + Team[city.team]}
                                    style={{ opacity: 0.5 + (city.defense / 20) }}>
                                    🏙
                                </span>
                            </a>
                            <div>
                                <div>
                                    🛡{city.defense}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="buildings-view">
                <span>
                    {GeographyInfo.filter(({ piece }) => piece !== null)
                        .filter((o, i) => props.player.buildingPhase[i] === "built")
                        .map(({ piece }, i) =>
                            <a key={i}
                                className={"button is-large is-outlined is-" + Team[props.player.team]}
                                style={{ borderColor: "transparent" }}>
                                <span className="icon is-large">
                                    <span className="fa building">{piece!.toUpperCase()}</span>
                                </span>
                            </a>
                        )
                    } {GeographyInfo.filter(({ piece }) => piece !== null)
                        .filter((o, i) => props.player.buildingPhase[i] === "blueprint")
                        .map(({ piece }, i) =>
                            <a key={i}
                                className={"button is-large is-outlined is-" + Team[props.player.team]}
                                style={{ borderColor: "transparent" }}>
                                <span className="icon is-large">
                                    <span className="fa artifact">{piece}</span>
                                </span>
                            </a>
                        )
                    }
                </span>
            </div>
        </div>
    </div>;

export default Player;
