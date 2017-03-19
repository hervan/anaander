// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Game from "../Game";

interface IProps {
    terrain: Game.Terrain;
    move: (move: Game.Play) => void;
};

function terrainColor(geography: Game.Geography): Game.Color {
    switch (geography) {
        case "city": return "primary";
        case "island": return "info";
        case "forest": return "success";
        case "swamp": return "warning";
        case "mountain": return "danger";
        case "plains": return "default";
    }
}

export default (props: IProps) =>
    <article
        className={"terrain message is-" + terrainColor(props.terrain.geography)}
        style={{ top: props.terrain.position.row * 60, left: props.terrain.position.col * 60 }}>
        <div className="terrain message-body"></div>
    </article>;
