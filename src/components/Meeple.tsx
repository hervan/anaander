import * as React from "react";

import {Meeple, Side} from "../logic/Meeple";
import {Team} from "../logic/Player";
import {Position} from "../logic/Terrain";

interface IProps {
    meeple: Meeple;
    translation: {
        row: number;
        col: number;
    };
    scale: number;
    size: number;
    select: (position: Position) => void;
};

const Meeple: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div style={{ pointerEvents: "none" }}>
        <span className={"meeple is-" + Team[props.meeple.team]}
            style={{
                top: `${ (props.meeple.position.row + 0.15) * props.size + props.translation.row }vmin`,
                left: `${ (props.meeple.position.col + 0.15) * props.size + props.translation.col }vmin`,
                transformOrigin: `0px 0px`,
                transform: `scale(${props.scale * props.size / 3.8})`,
                opacity: 0.5 + (props.meeple.resistance / 20)
            }}>
            <i className={"fa fa-user-circle" + (props.meeple.side === Side.heads ? "-o" : "")}>
            </i>
        </span>
    </div>;

export default Meeple;
