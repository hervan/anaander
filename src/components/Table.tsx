import * as React from "react";

import { Action, Direction, Game, Lesson, Meeple, Play, play, setup, Team, tutorial } from "../Game";

import Board from "./Board";
import Controls from "./Controls";
import Setup from "./Setup";
import Status from "./Status";
import Tutorial from "./Tutorial";

interface IState {
    game: Game;
    playQueue: Play[][];
    lesson: Lesson;
};

export interface IProps {
    game: Game;
    enqueuePlay: (play: Play) => void;
    lesson?: Lesson;
};

export class Table extends React.Component<{}, IState> {

    state: IState;

    constructor() {

        super();

        this.state = {
            game: setup(0),
            playQueue: [[], [], [], [], [], []],
            lesson: { index: 0, step: 0, autoplay: false }
        };
    }

    enqueuePlay(playData: Play): void {

        if (playData.player === Team.default) {

            switch (playData.state) {

                case "setup":

                if (playData.action === null) {

                    this.setState({ game: setup(0) });

                } else {

                    const change: number =
                        (playData.action === "skip" ? 0 : this.state.game.players.length)
                        + (playData.action === "right" && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === "left" && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({ game: setup(change) });
                }

                break;

                case "tutorial":

                const lesson = playData.action as Lesson;
                const tutorialGame: Game = tutorial(lesson.index).game;

                if (!lesson.autoplay || lesson.step < 0) {

                    this.setState({
                        game: tutorialGame,
                        lesson: lesson
                    });
                } else {

                    this.setState({
                        lesson: lesson
                    });
                }

                break;

                case "play":

                const gameStep: Game = play(this.state.game, playData);
                this.setState({ game: gameStep });

                break;
            }
        } else {

            const queue: Play[][] = this.state.playQueue;
            queue[playData.player].push(playData);
            this.setState({ playQueue: queue });
        }
    }

    componentDidUpdate(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.currentPlayer].length > 0) {

            const playData: Play = queue[this.state.game.currentPlayer].shift() as Play;
            this.setState({ game: play(this.state.game, playData), playQueue: queue });
        }
    }

    render(): JSX.Element {

        let leftPanel: JSX.Element;

        switch (this.state.game.state) {

            case "tutorial":
            leftPanel = <Tutorial
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)}
                lesson={this.state.lesson}
                />;
            break;

            case "setup":
            leftPanel = <Setup
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} />;
            break;

            default:
            leftPanel = <Status
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} />;
        }

        const rightPanel = this.state.game.state !== "tutorial" ?
            <Controls
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} /> :
            null;

        return (
            <section className="section">
                <div className="container is-fluid">
                    <div id="table" className="tile is-ancestor">

                        {leftPanel}

                        <Board
                            game={this.state.game}
                            enqueuePlay={this.enqueuePlay.bind(this)} />

                        {rightPanel}

                    </div>
                </div>
            </section>
        );
    }
}
