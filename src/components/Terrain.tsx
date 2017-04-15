// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Geography,
    Play,
    Team,
    Terrain
} from "../Game";

interface IProps {
    terrain: Terrain;
    enqueuePlay: (move: Play) => void;
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
        title={Geography[props.terrain.geography] + "\nspace for " + props.terrain.spaceLeft + " meeples"}
        className={"terrain message is-"
            + terrainColor(props.terrain.geography)}
        style={{ top: props.terrain.position.row * 44, left: props.terrain.position.col * 44 }}>
    </article>;

export default Terrain;
