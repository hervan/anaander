// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import * as Game from "../Game";

interface IProps {
    meeple: Game.Meeple;
};

export default (props: IProps) =>
    <span className={"meeple icon is-medium is-" + props.meeple.color}
      style={{ top: props.meeple.position.row * 44 + 8, left: props.meeple.position.col * 44 + 8 }}>
        <i className={"fa fa-user-circle" + (props.meeple.turn === "heads" ? "-o" : "")}></i>
    </span>;
