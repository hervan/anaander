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

export interface ITutorialProps {
    enqueuePlay: (play: Play) => void;
    lesson: Lesson;
}

export class Table extends React.Component<{}, IState> {

    constructor() {

        super();

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
                        lesson: undefined
                    });

                } else {

                    const change: number =
                        (playData.action === Action.skip ? 0 : this.state.game.players.length)
                        + (playData.action === Action.right && this.state.game.players.length < 5 ? 1 : 0)
                        + (playData.action === Action.left && this.state.game.players.length > 0 ? -1 : 0);

                    this.setState({
                        game: setup(change),
                        lesson: undefined
                    });
                }

                break;

                case Mode.tutorial:

                const lesson = playData.action as Lesson;
                const tutorialGame: Game = tutorial(lesson.index);

                if (this.state.lesson && this.state.lesson.index === lesson.index) {

                    this.setState({
                        game: tutorialGame,
                        playQueue: [[], [], [], [], [], []]
                    });
                } else {

                    this.setState({
                        game: tutorialGame,
                        playQueue: [[], [], [], [], [], []],
                        lesson: lesson
                    });
                }

                break;

                case Mode.play:

                const gameStep: Game = play(this.state.game, playData);
                this.setState({
                    game: gameStep,
                    lesson: undefined
                });

                break;
            }
        } else {

            const queue: Play[][] = this.state.playQueue;
            queue[playData.team].push(playData);
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

        switch (this.state.game.mode) {

            case Mode.tutorial:
            leftPanel = <Tutorial
                enqueuePlay={this.enqueuePlay.bind(this)}
                lesson={this.state.lesson ? this.state.lesson : { index: 0 }}
                />;
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
