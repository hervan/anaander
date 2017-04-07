// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Game from "../Game";

interface IProps {
    terrain: Game.Terrain;
    enqueuePlay: (move: Game.Play) => void;
};

function terrainColor(geography: Game.Geography): string {
    switch (geography) {
        case Game.Geography.city: return Game.Team[Game.Team.primary];
        case Game.Geography.island: return Game.Team[Game.Team.info];
        case Game.Geography.forest: return Game.Team[Game.Team.success];
        case Game.Geography.swamp: return Game.Team[Game.Team.default];
        case Game.Geography.mountain: return Game.Team[Game.Team.danger];
        case Game.Geography.plains: return Game.Team[Game.Team.warning];
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <article
        title={Game.Geography[props.terrain.geography] + "\nspace for " + props.terrain.spaceLeft + " meeples"}
        className={"terrain message is-"
            + terrainColor(props.terrain.geography)}
        style={{ top: props.terrain.position.row * 44, left: props.terrain.position.col * 44 }}>
    </article>;

export default Terrain;
