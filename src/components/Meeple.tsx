// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import {
    Meeple,
    Position,
    Team,
    Turn
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
    <div onClick={() => props.select(props.meeple.position)}>
        <span className={"icon is-medium meeple is-" + Team[props.meeple.team]}
            style={{
                top: props.meeple.position.row * 44 + 7 + props.translation.row,
                left: props.meeple.position.col * 44 + 7 + props.translation.col,
                transform: "scale(" + props.scale + ")",
                opacity: 0.5 + (props.meeple.resistance / 20)
            }}>
            <i
                title={"strength: " + props.meeple.strength
                    + "\nresistance: " + props.meeple.resistance
                    + "\nfaith: " + props.meeple.faith}
                className={"fa fa-user-circle" + (props.meeple.turn === Turn.heads ? "-o" : "")}>
            </i>
        </span>
    </div>;

export default Meeple;
