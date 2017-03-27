// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { ITutorialProps } from "./Table";

const tutorialSteps: Array<string> = [
    "welcome to anaander, a game about post-human armies with a shared mind (veeeeeeery loosely based on Ancillary\
        Justice, first novel in the Imperial Radch series by Ann Leckie, where multiple bodies and soldiers form a\
        shared consciousness for single entities, like spaceships, or like the Lord of the Radch herself). click one\
        of these paragraphs and the board shows you a scenario where you can easier understand the rules.",
    "you move around the map converting meeples of little faith to your swarm, and battling meeples of your\
        opponents, trying to reduce their swarms to zero (removing the player from the game). the last player standing\
        is the winner.",
    "the most important game mechanic in anaander is that you move your whole swarm at once (every meeple of your\
        color). you may move some meeples individually when spending extra actions, and some meeples are not able to\
        follow the same movement of the swarm so they will not move, but usually they go with the flow.",
    "the rules for movement are as follow (you may hover your mouse over meeples and terrain tiles to see their\
        individual stats, which may help you better understand them).",
    "meeples are two-sided, and in each turn you are allowed to each meeple only if its current side up matches\
        the current turn.",
    "after all players make their moves, the current turn is flipped.",
    "after a meeple is moved, its side is flipped too; so usually a meeple that is moved in a turn, also gets to\
        play in the next turn.",
    "meeples can enter a terrain tile only if there is space available in it for the meeple to enter. if a swarm\
        moves in a direction which would cause a meeple to enter a terrain with no space left, the swarm makes its\
        move but the meeple stands still - also, not flipping its side, so it will miss the next turn.",
    "the space available to meeples in the terrains ranges from 1 to 6."
];

const Tutorial: ((props: ITutorialProps) => JSX.Element) = (props: ITutorialProps) => {

    let tutorial: JSX.Element = <br />;

    tutorial =
        <div className="content">
            {tutorialSteps.map((tutorialStep, index) =>
                <p key={index} onClick={() => props.enqueuePlay({
                    state: "tutorial",
                    player: "default",
                    from: "player",
                    action: { step: index }
                })}>
                    {index === props.step.step ?
                    <strong>{tutorialStep}</strong> :
                    tutorialStep}
                </p>
            )}
        </div>;

    return (
        <div id="status" className="tile is-4 is-parent">
            <div className="notification tile is-child">
                <h1 className="title">anaander tutorial</h1>
                <h2 className="subtitle">
                    (click <a className="is-link" onClick={() => props.enqueuePlay({
                        state: "setup",
                        player: "default",
                        from: "player",
                        action: "skip"
                    })}>here</a> to go back)
                </h2>
                <span>
                    {tutorial}
                </span>
            </div>
        </div>
    );
};

export default Tutorial;
