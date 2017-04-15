import * as React from "react";

import {
    Action,
    Game,
    Lesson,
    Meeple,
    Mode,
    Play,
    play,
    setup,
    Team,
    tutorial
} from "../Game";

import Board from "./Board";
import Controls from "./Controls";
import Setup from "./Setup";
import Status from "./Status";
import Tutorial from "./Tutorial";

interface IState {
    game: Game;
    playQueue: Play[][];
    lesson?: Lesson;
};

export interface IProps {
    game: Game;
    enqueuePlay: (play: Play) => void;
};

export class Table extends React.Component<{}, IState> {

    refresher: number;

    constructor() {

        super();

        window.clearInterval(this.refresher);
        this.refresher = window.setInterval(() => this.dequeue(), 85);

        this.state = {
            game: setup(0),
            playQueue: [[], [], [], [], [], []]
        };
    }

    enqueuePlay(playData: Play): void {

        if (playData.team === Team.default) {

            switch (playData.mode) {

                case Mode.setup:

                if (playData.action === null) {

                    this.setState({
                        game: setup(0),
                        playQueue: [[], [], [], [], [], []]
                    });

                } else {

                    const change: number =
                        (playData.action === Action.skip ? 0 : this.state.game.players.length)
                        + (playData.action === Action.right && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === Action.left && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({ game: setup(change) });
                }

                break;

                case Mode.tutorial:

                const lesson = playData.action as Lesson;

                this.setState({
                    game: tutorial(lesson.index),
                    playQueue: [[], [], [], [], [], []],
                    lesson: lesson
                });

                break;

                case Mode.play:

                this.setState({ game: play(this.state.game, playData) });

                break;
            }
        } else {

            const queue: Play[][] = this.state.playQueue;
            queue[playData.team].push(playData);
            this.setState({ playQueue: queue });
        }
    }

    dequeue(): void {

        const queue: Play[][] = this.state.playQueue;

        if (this.state.game.players.length > 0 && queue[this.state.game.currentPlayer].length > 0) {
            const playData: Play = queue[this.state.game.currentPlayer].shift() as Play;
            this.setState({ game: play(this.state.game, playData), playQueue: queue });
        }
    }

    componentWillUnmount(): void {

        window.clearInterval(this.refresher);
    }

    render(): JSX.Element {

        let leftPanel: JSX.Element;

        switch (this.state.game.mode) {

            case Mode.tutorial:
            leftPanel = <Tutorial
                enqueuePlay={this.enqueuePlay.bind(this)}
                lesson={this.state.lesson!} />;
            break;

            case Mode.setup:
            leftPanel = <Setup
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} />;
            break;

            default:
            leftPanel = <Status
                game={this.state.game}
                enqueuePlay={this.enqueuePlay.bind(this)} />;
        }

        const rightPanel = this.state.game.mode !== Mode.tutorial ?
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
