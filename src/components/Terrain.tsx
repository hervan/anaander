// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Action,
    Construction,
    Geography,
    GeographyInfo,
    Play,
    Position,
    Team,
    Terrain
} from "../Game";

interface IProps {
    terrain: Terrain;
    size: number;
    selected: boolean;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, selectmode?: "swarm" | "meeple") => void;
};

function terrainColor(terrain: Terrain): string {
    if (terrain.construction.type === "emptysite" || terrain.construction.team === Team.default) {
        switch (terrain.geography) {
            case Geography.sea: return "info";
            case Geography.swamp: return "default";
            case Geography.mountain: return "danger";
            case Geography.forest: return "success";
            case Geography.valley: return "primary";
            case Geography.plains: return "nocolor";
            case Geography.desert:
            default: return "warning";
        }
    } else {
        return Team[terrain.construction.team];
    }
}

export function buildings(blueprint: string): string {
    switch (blueprint) {
        case "i": return "🏭";
        case "l": return "📡";
        case "o": return "🏫";
        case "s": return "🚉";
        case "t": return "🏥";
        default: return "🏗";
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div
        className={"terrain is-"
            + terrainColor(props.terrain)
            + (props.selected ? " selected" : "")}
        style={{
            width: `calc(${props.size}vmin - 1px)`,
            height: `calc(${props.size}vmin - 1px)`,
            top: `${props.terrain.position.row * props.size}vmin`,
            left: `${props.terrain.position.col * props.size}vmin`,
            opacity: 0.5
        }}
        onClick={() => props.select(props.terrain.position)}
        onDoubleClick={() => props.select(props.terrain.position, "swarm")}>
        {props.terrain.construction.type === "city" ?
        <span className={"is-" + Team[props.terrain.construction.team]}
            style={{ fontSize: `${props.size / 1.5}vmin`, color: Team[props.terrain.construction.team] }}>
            🏙&#xFE0F;
        </span> :
        props.terrain.construction.type === "building" ?
        <span className={"building is-" + Team[props.terrain.construction.team]}
            style={{ fontSize: `${props.size / 1.5}vmin` }}>
            {buildings(props.terrain.construction.blueprint)}&#xFE0F;
        </span> : null}
    </div>;

export default Terrain;
