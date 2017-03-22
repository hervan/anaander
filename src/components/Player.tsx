// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { Player, Play } from "../Game";

interface IProps {
  player: Player;
  moveClick: (move: Play) => void;
  active: boolean;
};

export default (props: IProps) =>
  <div className="player tile is-parent">
    <article className={"tile is-child message is-" + props.player.team + (props.active ? " current-player" : "")}
      style={{
        opacity: props.player.swarmSize === 0 ? 0.1 : 1,
        transition: "opacity 1s"
      }}>
      <div className="message-header">
        <p>general {props.player.team}</p>
      </div>
      <div className="message-body">
        <div className="field has-addons tile is-parent">
          <div className="control tile is-child">
            <p>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "guard"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-paper-o"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "up"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-up"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "attack"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-rock-o"></i>
                </span>
              </a>
            </p>
            <p>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "left"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-left"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "down"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-down"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.team}
                onClick={() => props.moveClick({
                  state: "play",
                  player: props.player.team,
                  from: "player",
                  action: "right"
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-right"></i>
                </span>
              </a>
            </p>
          </div>
          <div className="tile is-child">
            <p title="if you lose\nall your meeples\nyou're dead.">
              swarm: {props.player.swarmSize} meeple{props.player.swarmSize > 1 ? "s" : ""}
            </p>
            <p title="individual actions to be performed\nbefore or after your swarm action\non available meeples.">
              actions: {props.player.individualActions}
            </p>
            <p>{props.player.swarmSize > 0 ? "" : "you died :("}</p>
          </div>
        </div>
      </div>
    </article>
  </div>;
