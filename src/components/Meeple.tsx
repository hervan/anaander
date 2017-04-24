// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Meeple,
    Position,
    Side,
    Team
} from "../Game";

interface IProps {
    meeple: Meeple;
    translation: {
        row: number;
        col: number;
    };
    scale: number;
    select: (position: Position) => void;
};

const Meeple: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div style={{ pointerEvents: "none" }}>
        <span className={"icon is-medium meeple is-" + Team[props.meeple.team]}
            style={{
                top: props.meeple.position.row * 45 + 7 + props.translation.row,
                left: props.meeple.position.col * 45 + 7 + props.translation.col,
                transform: "scale(" + props.scale + ")",
                opacity: 0.5 + (props.meeple.resistance / 20)
            }}>
            <i className={"fa fa-user-circle" + (props.meeple.side === Side.heads ? "-o" : "")}>
            </i>
        </span>
    </div>;

export default Meeple;
