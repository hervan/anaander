// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import * as Game from "../Game";

interface IProps {
    meeple: Game.Meeple;
};

export default (props: IProps) =>
    <span className={"icon is-medium meeple is-" + props.meeple.color}
        style={{
            top: props.meeple.position.row * 44 + 8,
            left: props.meeple.position.col * 44 + 8,
            opacity: props.meeple.resistance / 10
        }}>
        <i
            title={"strength: " + props.meeple.strength
                + "\nresistance: " + props.meeple.resistance
                + "\nfaith: " + props.meeple.faith}
            className={"fa fa-user-circle" + (props.meeple.turn === "heads" ? "-o" : "")}>
        </i>
    </span>;
