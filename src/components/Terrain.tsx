// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
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
    enqueuePlay: (play: Play) => void;
    select: (position: Position) => void;
};

function terrainColor(geography: Geography): string {
    switch (geography) {
        case Geography.city: return Team[Team.primary];
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
        style={{ top: props.terrain.position.row * 44, left: props.terrain.position.col * 44 }}
        onClick={() => props.select(props.terrain.position)}>
        <span className="fa artifact">
            {Items.map(({ type, piece }) => piece)
                .filter((type, index) => props.terrain.items[index])
                .join("")}
        </span>
    </article>;

export default Terrain;
