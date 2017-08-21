import * as React from "react";

import {Construction} from "../logic/Construction";
import {Action, Play} from "../logic/Game";
import {Team} from "../logic/Player";
import {Geography, Position, Terrain as T} from "../logic/Terrain";

interface IProps {
    terrain: T;
    size: number;
    selected: boolean;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, selectmode?: "swarm" | "meeple") => void;
};

function terrainColor(terrain: T): string {
    if (terrain.construction.type === "emptysite" || terrain.construction.team === Team.default) {
        switch (terrain.geography) {
            case Geography.sea: return "info";
            case Geography.desert: return "warning";
            case Geography.mountain: return "danger";
            case Geography.forest: return "success";
            case Geography.plains: return "default";
            case Geography.valley: return "primary";
            case Geography.sprawl: return "nocolor";
            default: return "nocolor";
        }
    } else {
        return Team[terrain.construction.team];
    }
}

export function buildingIcon(blueprint: string): string {
    switch (blueprint) {
        case "i": return "📡";
        case "l": return "🏭";
        case "o": return "🏫";
        case "s": return "🚉";
        case "t": return "🏥";
        default: return "🏗️";
    }
}

class Terrain extends React.Component<IProps, {}> {

    shouldComponentUpdate(nextProps: IProps) {

        return nextProps.terrain.position !== this.props.terrain.position
            || nextProps.terrain.geography !== this.props.terrain.geography
            || nextProps.terrain.construction.type !== this.props.terrain.construction.type
            || (nextProps.terrain.construction.type === "building"
                && this.props.terrain.construction.type === "building"
                && (nextProps.terrain.construction.blueprint !== this.props.terrain.construction.blueprint
                    || nextProps.terrain.construction.team !== this.props.terrain.construction.team));
    }

    render() {

        return <div
            className={"terrain is-"
            + terrainColor(this.props.terrain)
            + (this.props.selected ? " selected" : "")}
            style={{
                width: `calc(${this.props.size}vmin - 1px)`,
                height: `calc(${this.props.size}vmin - 1px)`,
                top: `${this.props.terrain.position.row * this.props.size}vmin`,
                left: `${this.props.terrain.position.col * this.props.size}vmin`,
                opacity: 0.5
            }}
            onClick={() => this.props.select(this.props.terrain.position)}
            onDoubleClick={() => this.props.select(this.props.terrain.position, "swarm")}>
            {this.props.terrain.construction.type === "city" ?
            <span className={"is-" + Team[this.props.terrain.construction.team]}
                    style={{ fontSize: `${this.props.size / 1.5}vmin`, color: Team[this.props.terrain.construction.team] }}>
                    🏙️&#xFE0F;
                </span> :
                this.props.terrain.construction.type === "building" ?
                <span className={"building is-" + Team[this.props.terrain.construction.team]}
                    style={{ fontSize: `${this.props.size / 1.5}vmin` }}>
                    {buildingIcon(this.props.terrain.construction.blueprint)}&#xFE0F;
                </span> : null}
            </div>;
    }
}
    
export default Terrain;
