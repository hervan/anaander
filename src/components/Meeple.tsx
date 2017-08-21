import * as React from "react";

import {Meeple as M, Phase} from "../logic/Meeple";
import {Team} from "../logic/Player";
import {Position} from "../logic/Terrain";

interface IProps {
    meeple: M;
    translation: {
        row: number;
        col: number;
    };
    scale: number;
    size: number;
    select: (position: Position) => void;
};

class Meeple extends React.Component<IProps, {}> {

    shouldComponentUpdate(nextProps: IProps) {

        return nextProps.meeple.phase !== this.props.meeple.phase
            || nextProps.meeple.position !== this.props.meeple.position
            || nextProps.meeple.team !== this.props.meeple.team
            || nextProps.meeple.resistance !== this.props.meeple.resistance
            || nextProps.meeple.topsMeeple !== this.props.meeple.topsMeeple;
    }

    render() {

        return <div style={{ pointerEvents: "none" }}>
            <span className={"meeple is-" + Team[this.props.meeple.team]}
                style={{
                    top: `${ (this.props.meeple.position.row + 0.15) * this.props.size + this.props.translation.row }vmin`,
                    left: `${ (this.props.meeple.position.col + 0.15) * this.props.size + this.props.translation.col }vmin`,
                    transformOrigin: `0px 0px`,
                    transform: `scale(${this.props.scale * this.props.size / 3.8})`,
                    opacity: 0.5 + (this.props.meeple.resistance / 20)
                }}>
                <i className={"fa fa-user-circle" + (this.props.meeple.phase === Phase.high ? "-o" : "")}>
                </i>
            </span>
        </div>;
    }
}

export default Meeple;
