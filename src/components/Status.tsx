// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { IProps } from "./Table";

const Status: ((props: IProps) => JSX.Element) = (props: IProps) => {

    let guide: JSX.Element = <br />;
    let guide_detail: JSX.Element = <br />;
    let tutorial: JSX.Element = <br />;

    switch (props.game.state) {

        case "setup":

            tutorial =
                <span>
                    <p>
                        welcome to anaander, a game about post-human armies with a shared mind (veeeeeeery loosely based on Ancillary Justice, first entry in the Imperial Radch series by Ann Leckie, where multiple bodies and soldiers form a shared consciousness for single entities, like spaceships or even the Lord of the Radch herself).
                    </p>
                    <p>
                        you move around the map converting meeples of little faith to your swarm, and battling meeples of your opponents, trying to reduce their swarms to zero (removing the player from the game). the last player standing is the winner.
                    </p>
                    <p>
                        the most important game mechanic in anaander is that you move your whole swarm at once (every meeple of your color). you may move some meeples individually when spending extra actions, but usually they will go with the flow.
                    </p>
                    <p>
                        the rules for movement are as follow (you may hover your mouse over meeples and terrain tiles to see their individual stats, which may help you better understand them).
                        <ul>
                            <li>
                                meeples are two-sided, and in each turn you are allowed to move only meeples with the turn current side up.
                            </li>
                            <li>
                                after all players make their moves, the current side up is changed.
                            </li>
                            <li>
                                after a meeple is moved, its side is flipped; so usually a meeple that is moved in a turn, also gets to play in the next turn.
                            </li>
                            <li>
                                meeples can enter a terrain tile only if there is space available to the meeple in it. if a swarm moves in a direction which would cause a meeple to enter a terrain with no space left, the swarm makes its move but the meeple stands still - also, not flipping its side, so it will not play next turn.
                            </li>
                            <li>
                                the space available to meeples in the terrains is from 1 to 6.
                            </li>
                        </ul>
                    </p>
                </span>;

            guide =
                <p>
                    how many players?
                    &nbsp;
                    <a className="is-link" onClick={() => props.playEvent({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "left"
                    })}>
                        <span className="icon">
                            <i className="fa fa-minus"></i>
                        </span>
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => props.playEvent({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "skip"
                    })}>
                        {props.game.players.length}
                    </a>
                    &nbsp;
                    <a className="is-link" onClick={() => props.playEvent({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "right"
                    })}>
                        <span className="icon">
                            <i className="fa fa-plus"></i>
                        </span>
                    </a>
                </p>;
            guide_detail =
                <p>
                    <a className="is-link" onClick={() => props.playEvent({
                        state: "play",
                        player: "default",
                        from: "player",
                        action: null
                    })}>
                        click here to begin.
                    </a>
                </p>;

            break;

        case "play":

            switch (props.game.lastAction) {

                case "up":
                case "down":
                case "left":
                case "right":
                case "attack":
                case "guard":
                case "explore":
                case "convert":
                case "skip":
                case null:

                    const side: JSX.Element =
                        <span className="icon">
                            <i className={"fa fa-user-circle"
                                + (props.game.turn === "heads" ? "-o" : "")
                                + " is-" + props.game.currentPlayer}></i>
                        </span>;
                    guide_detail = <p>choose an action for these meeples: {side}</p>;
                    break;

                default:

                    guide_detail = <p>{props.game.lastAction.explanation}</p>;
                    break;
            }

            guide =
                <p>
                    it's <span className={"is-" + props.game.currentPlayer}>general {props.game.currentPlayer}</span>'s turn.
                </p>;

            break;

        case "end":

            guide =
                <p>
                    <span className={"is-" + props.game.currentPlayer}>general {props.game.currentPlayer}</span> won the game!
                </p>;

            break;
    };

    return (
        <div id="status" className="tile is-3 is-parent">
            <div className="notification tile is-child">
                <h1 className="title">anaander</h1>
                <span>
                    {tutorial}
                </span>
                <h2 className="subtitle">
                    {guide}
                </h2>
                <span>
                    {guide_detail}
                </span>
            </div>
        </div>
    );
};

export default Status;
