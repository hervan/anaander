// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Game from "../Game";

interface IProps {
    meeple: Game.Meeple;
    translation: {
        row: number;
        col: number;
    };
    scale: number;
};

const Meeple: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <span className={"icon is-medium meeple is-" + Game.Team[props.meeple.team]}
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
            className={"fa fa-user-circle" + (props.meeple.turn === Game.Turn.heads ? "-o" : "")}>
        </i>
    </span>;

export default Meeple;
