// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Action,
    Geography,
    GeographyInfo,
    Play,
    Position,
    Team,
    Terrain
} from "../Game";

interface IProps {
    terrain: Terrain;
    selected: boolean;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
};

function terrainColor(geography: Geography): string {
    switch (geography) {
        case Geography.sea: return "info";
        case Geography.swamp: return "default";
        case Geography.mountain: return "danger";
        case Geography.forest: return "success";
        case Geography.valley: return "primary";
        case Geography.plains: return "warning";
        case Geography.desert: return "nocolor";
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div
        className={"terrain is-"
            + terrainColor(props.terrain.geography)
            + (props.selected ? " selected" : "")}
        style={{
            top: props.terrain.position.row * 45,
            left: props.terrain.position.col * 45,
            opacity: 0.5
        }}
        onClick={() => props.select(props.terrain.position)}>
        {props.terrain.construction.type === "city" ?
        <span className={"is-" + Team[props.terrain.construction.team]}
            style={{ fontSize: "2em" }}>
            🌃
        </span> :
        props.terrain.construction.type === "building" ?
        <span className={"building is-" + Team[props.terrain.construction.team]}>
            {props.terrain.construction.blueprint}
        </span> :
        props.terrain.blueprint ?
        <span className="artifact">
            {GeographyInfo[props.terrain.geography].piece}
        </span>
        : null}
    </div>;

export default Terrain;
