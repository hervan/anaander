// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Game from "../Game";

interface IProps {
    terrain: Game.Terrain;
    enqueuePlay: (move: Game.Play) => void;
};

function terrainColor(geography: Game.Geography): Game.Team {
    switch (geography) {
        case "city": return "primary";
        case "island": return "info";
        case "forest": return "success";
        case "swamp": return "default";
        case "mountain": return "danger";
        case "plains": return "warning";
    }
}

const Terrain: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <article
        title={props.terrain.geography + "\nspace for " + props.terrain.spaceLeft + " meeples"}
        className={"terrain message is-" + terrainColor(props.terrain.geography)}
        style={{ top: props.terrain.position.row * 44, left: props.terrain.position.col * 44 }}>
    </article>;

export default Terrain;
