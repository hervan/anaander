import * as React from "react";

import Card from "../logic/Card";

import {cards} from "../logic/Card";
import {City} from "../logic/Construction";
import {Action, Game, Play} from "../logic/Game";
import {Meeple, Side} from "../logic/Meeple";
import {Player, Team} from "../logic/Player";
import {Geography, GeographyInfo, Position, Resource, Terrain} from "../logic/Terrain";

import {Control} from "./Table";
import {buildingIcon} from "./Terrain";

interface IProps {
    player: Player;
    swarm: Array<{ meeple: Meeple, terrain: Terrain }>;
    empire: Array<{ city: City, spaceLeft: number }>;
    game: Game;
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, selectmode?: "swarm" | "meeple") => void;
    playCard: (cardKey: number) => void;
    selection: number[];
    active: boolean;
}

function geographyIcon(geography: Geography): string {
    switch (geography) {
        case Geography.sea: return "🌊";
        case Geography.desert: return "🏜️";
        case Geography.mountain: return "🏔️";
        case Geography.forest: return "🌳";
        case Geography.valley: return "🏞️";
        case Geography.plains: return "🛤️";
        case Geography.sprawl: return "🏘️";
    }
}

function resourceIcon(resource: Resource): string {

    switch (resource) {

        case Resource.fuel: return "🛢️";
        case Resource.food: return "🍗";
        case Resource.ore: return "🌑";
        case Resource.silicon: return "💻";
        case Resource.cubit: return "🛑";
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
            <div key="hand-view">
                {props.player.hand.map((card) => cards[card.key])
                    .map((card) =>
                        <div key={card.key} style={{cursor: "pointer"}} onClick={() => props.playCard(card.key)}>
                            {
                                props.selection.length > 0 && props.active ?
                                <span className="costs" style={{margin: "2px"}}>
                                {
                                    card.cost
                                        .map((amount, i) => ({ i: i, icon: resourceIcon(i), amount: amount }))
                                        .filter(({amount}) => amount > 0)
                                        .map(({i, icon, amount}) =>
                                            <span key={i}>
                                                {icon}&#xFE0F;
                                                {props.game.turn.round > card.acquisitionRound ?
                                                    amount * card.target(props.game,
                                                    props.game.meeples[props.selection[0]].position).length : 0}
                                            </span>
                                        )
                                }
                                </span> : null
                            }
                            <span style={{margin: "2px"}}>
                                {card.name}
                            </span>
                        </div>
                    )
                }
            </div>
            <div key="meeple-view">
                {props.swarm
                    .sort((a, b) => b.meeple.strength - a.meeple.strength)
                    .map(({meeple, terrain}) =>
                        <div key={meeple.key} style={{ display: "inline-block", cursor: "pointer" }}
                            onClick={() => props.select(meeple.position)}
                            onDoubleClick={() => props.select(meeple.position, "swarm")}
                            className={(props.selection
                                .some((meepleKey) => meeple.key === meepleKey) ? "tableau-selected" : undefined) }>
                            <div className="stats"
                                style={{ display: "inline-block", verticalAlign: "top" }}>
                                <div className={"icon is-small"
                                    + " is-" + Team[meeple.team]}
                                    style={{ opacity: 0.5 + (meeple.resistance / 20) }}>
                                    <i className={"fa fa-user-circle"
                                        + (meeple.side === Side.heads ? "-o" : "")}>
                                    </i>
                                </div>
                                <div>
                                {
                                    terrain.construction.type === "emptysite" ?
                                    geographyIcon(terrain.geography) :
                                    terrain.construction.type === "city" ?
                                    "🏙️" :
                                    buildingIcon(terrain.construction.blueprint)
                                }&#xFE0F;
                                </div>
                            </div>
                            <div className="stats"
                                style={{ display: "inline-block", verticalAlign: "top" }}>
                                <div>
                                    ⚔️&#xFE0F;{meeple.strength}
                                </div>
                                <div>
                                    🛡️&#xFE0F;{meeple.resistance}
                                </div>
                            </div>
                            <div className="stats"
                                style={{ display: "inline-block", verticalAlign: "top" }}>
                                <div>
                                    🙏&#xFE0F;{meeple.faith}
                                </div>
                                <div>
                                    🏃&#xFE0F;{meeple.speed}
                                </div>
                            </div>
                            <div className="stats"
                                style={{ display: "inline-block", verticalAlign: "top" }}>
                                {
                                    terrain.construction.resources
                                        .map((amount, i) => ({ index: i, icon: resourceIcon(i), amount: amount }))
                                        .filter(({amount}) => amount > 0)
                                        .map(({index, icon, amount}) =>
                                            <div key={index}>{icon}&#xFE0F;{amount}</div>
                                        )
                                }
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
                                    🏙️&#xFE0F;
                                </span>
                            </a>
                            <div style={{ textAlign: "center" }}>
                                🛡️&#xFE0F;{city.defense}
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
