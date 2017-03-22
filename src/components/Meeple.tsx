// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { Meeple } from "../Game";

interface IProps {
    meeple: Meeple;
    translation: {
        row: number;
        col: number;
    };
    scale: number;
};

export default (props: IProps) =>
    <span className={"icon is-medium meeple is-" + props.meeple.team}
        style={{
            top: props.meeple.position.row * 44 + 8 + props.translation.row,
            left: props.meeple.position.col * 44 + 8 + props.translation.col,
            transform: "scale(" + props.scale + ")",
            opacity: 0.5 + (props.meeple.resistance / 20)
        }}>
        <i
            title={"strength: " + props.meeple.strength
                + "\nresistance: " + props.meeple.resistance
                + "\nfaith: " + props.meeple.faith}
            className={"fa fa-user-circle" + (props.meeple.turn === "heads" ? "-o" : "")}>
        </i>
    </span>;
