// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Action,
    Geography,
    Items,
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
        case Geography.city: return ""; // Team[Team.primary];
        case Geography.island: return Team[Team.info];
        case Geography.forest: return Team[Team.success];
        case Geography.swamp: return Team[Team.default];
        case Geography.mountain: return Team[Team.danger];
        case Geography.plains: return Team[Team.warning];
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <article
        title={Geography[props.terrain.geography] + "\nspace for " + props.terrain.spaceLeft + " meeples\n"
            + Items.map(({ type, piece }) => type).filter((type, index) => props.terrain.items[index]).join(", ")}
        className={"terrain message is-"
            + terrainColor(props.terrain.geography)
            + (props.selected ? " selected" : "")}
        style={{
            top: props.terrain.position.row * 45,
            left: props.terrain.position.col * 45
        }}
        onClick={() => props.select(props.terrain.position)}>
        {props.terrain.geography === Geography.city ?
        <span className="fa-stack fa-lg">
            <i className="fa fa-building-o fa-stack-2x" style={{ left: "10px" }}></i>
            <i className="fa fa-university fa-stack-1x"></i>
        </span>
        : null }
        <span className="artifact">
            {Items.map(({ type, piece }) => piece)
                .filter((type, index) => props.terrain.items[index])
                .join("")}
        </span>
    </article>;

export default Terrain;
