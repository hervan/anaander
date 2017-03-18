import * as React from 'react';
import * as Game from '../Game';

interface PlayerProps { player: Game.Player, move: (move: Game.Move) => void, active: boolean };

export default (props: PlayerProps) =>
  <div className={"player column"}>
    <article className={"message is-" + props.player.color + (props.active ? " current-player" : "")}>
      <div className="message-header">
        <p>general {props.player.color}</p>
      </div>
      <div className="message-body">
        <div className="field has-addons">
          <div className="control">
            <p>actions</p>
            <p>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'guard'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-paper-o"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'up'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-up"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'attack'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-rock-o"></i>
                </span>
              </a>
            </p>
            <p>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'left'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-left"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'down'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-down"></i>
                </span>
              </a>
              <a className={"button is-outlined is-" + props.player.color}
                onClick={() => props.move({
                  state: 'play',
                  player: props.player.color,
                  from: 'player',
                  action: 'right'
                })}>
                <span className="icon is-small">
                  <i className="fa fa-hand-o-right"></i>
                </span>
              </a>
            </p>
          </div>
        </div>
        <p>swarm: {props.player.meeples.length} meeple{props.player.meeples.length > 1 ? 's' : ''}</p>
        <p>no items</p>
      </div>
    </article>
  </div>;
