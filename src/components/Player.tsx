// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    City,
    Geography,
    GeographyInfo,
    Meeple,
    Play,
    Player,
    Position,
    Resource,
    Side,
    Team,
    Terrain
} from "../Game";

import { Control } from "./Table";
import { buildingIcon } from "./Terrain";

interface IProps {
    player: Player;
    swarm: Array<{ meeple: Meeple, terrain: Terrain }>;
    empire: Array<{ city: City, spaceLeft: number }>;
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, selectmode?: "swarm" | "meeple") => void;
    selection: number[];
    active: boolean;
}

function geographyIcon(geography: Geography): string {
    switch (geography) {
        case Geography.sea: return "🌊";
        case Geography.swamp: return "🕳";
        case Geography.mountain: return "🏔";
        case Geography.forest: return "🌳";
        case Geography.valley: return "🏞";
        case Geography.plains: return "🛣️";
        case Geography.desert: return "🏜";
    }
}

function resourceIcon(resource: Resource): string {

    switch (resource) {

        case Resource.fuel: return "🛢️";
        case Resource.food: return "🍗";
        case Resource.ore: return "🌑";
        case Resource.silicon: return "💻";
    }
}

const Player: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div className={"player is-" + Team[props.player.team]}
        style={{
            opacity: props.player.swarmSize === 0 ? 0.1 : 1,
            transition: "opacity 1s"}}>
        <div key="title">
            general {Team[props.player.team]} {props.player.swarmSize > 0 ? "" : "is dead :("}
        </div>
        <div key="details">
            <div key="player-view">
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
            <div key="resource-view">
                {props.player.resources.map((amount, i) => ({ index: i, icon: resourceIcon(i), amount: amount }))
                    .map(({index, icon, amount}) =>
                        <div key={index} style={{ display: "inline-block", margin: "2px" }}>
                            {icon}&#xFE0F;{amount}
                        </div>
                    )
                }
            </div>
            <div key="meeple-view">
                {props.swarm
                    .map(({meeple, terrain}) =>
                        <div key={meeple.key} style={{ display: "inline-block" }}>
                            <div style={{ display: "inline-block" }}>
                                <div>
                                    <a onClick={() => props.select(meeple.position)}
                                        onDoubleClick={() => props.select(meeple.position, "swarm")}
                                        className="button is-large is-outlined"
                                        style={{ textDecoration: "none", borderColor: "transparent" }}>
                                        <span className={"icon is-large"
                                            + (props.selection
                                                .some((meepleKey) => meeple.key === meepleKey) ? " selected" : "")
                                            + " is-" + Team[meeple.team]}
                                            style={{ opacity: 0.5 + (meeple.resistance / 20) }}>
                                            <i className={"fa fa-user-circle"
                                                + (meeple.side === Side.heads ? "-o" : "")}>
                                            </i>
                                        </span>
                                    </a>
                                    <div className="meeple-stats" style={{
                                        display: "inline-block"
                                    }}>
                                        <div>
                                            ⚔️&#xFE0F;{meeple.strength}
                                        </div>
                                        <div>
                                            🛡&#xFE0F;{meeple.resistance}
                                        </div>
                                        <div>
                                            🙏&#xFE0F;{meeple.faith}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    {
                                        terrain.construction.type === "emptysite"
                                            || terrain.construction.team === Team.default ?
                                        <span style={{margin: "2px"}}>
                                            {geographyIcon(terrain.geography)}&#xFE0F;
                                        </span> : null
                                    }
                                    {
                                        terrain.resources
                                        .map((amount, i) => ({ index: i, icon: resourceIcon(i), amount: amount }))
                                        .filter(({amount}) => amount > 0)
                                        .map(({index, icon, amount}) =>
                                            <span key={index} style={{margin: "2px"}}>{icon}&#xFE0F;{amount}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div key="cities-view">
                {props.empire
                    .map(({ city, spaceLeft }) =>
                        <div key={city.key} style={{ display: "inline-block" }}>
                            <a className="button is-large is-outlined"
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                    borderColor: "transparent"
                                }}>
                                <span className={"icon is-large"
                                    + " is-" + Team[city.team]}
                                    style={{ opacity: 0.5 + (city.defense / 20) }}>
                                    🏙&#xFE0F;
                                </span>
                            </a>
                            <div style={{ textAlign: "center" }}>
                                🛡&#xFE0F;{city.defense}
                                👥&#xFE0F;{spaceLeft}
                            </div>
                            <div style={{ textAlign: "center" }}>
                                {city.name}
                            </div>
                        </div>
                    )
                }
            </div>
            <div key="buildings-view">
                <span>
                    {GeographyInfo.filter(({ piece }) => piece !== null)
                        .filter((o, i) => props.player.buildingPhase[i] === "built")
                        .map(({ piece }, i) =>
                            <a key={i}
                                className={"button is-large is-outlined is-" + Team[props.player.team]}
                                style={{ borderColor: "transparent" }}>
                                <span className="icon is-large">
                                    <span className="fa building">{buildingIcon(piece!)}&#xFE0F;</span>
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
