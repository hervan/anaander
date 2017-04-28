// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Action,
    Geography,
    GeographyItem,
    Item,
    Play,
    Position,
    Team,
    Terrain
} from "../Game";

interface IProps {
    terrain: Terrain;
    selected: boolean;
    title: string;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
};

function terrainColor(geography: Geography): string {
    switch (geography) {
        case Geography.desert: return "warning";
        case Geography.swamp: return "default";
        case Geography.mountain: return "danger";
        case Geography.forest: return "success";
        case Geography.valley: return "info";
        case Geography.plains: return "";
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <article
        title={props.title}
        className={"terrain message is-"
            + terrainColor(props.terrain.geography)
            + (props.selected ? " selected" : "")}
        style={{
            top: props.terrain.position.row * 45,
            left: props.terrain.position.col * 45
        }}
        onClick={() => props.select(props.terrain.position)}>
        {props.terrain.city ?
        <span className="fa-stack fa-lg">
            <i className="fa fa-building-o fa-stack-2x" style={{ left: "10px" }}></i>
            <i className="fa fa-university fa-stack-1x"></i>
        </span>
        : null }
        <span className="artifact">
            {props.terrain.item ? GeographyItem[props.terrain.geography].piece : null}
        </span>
    </article>;

export default Terrain;
