// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { ITutorialProps } from "./Table";

const tutorialSteps: string[] = [
    "welcome to anaander, a game about post-human armies with a shared mind (veeeeeeery loosely based on Ancillary\
        Justice, first novel in the Imperial Radch series by Ann Leckie, where multiple bodies and soldiers form a\
        shared consciousness for single entities, like spaceships, or like the Lord of the Radch herself).",
    "your swarm is composed of every meeple of your color; you move around the map converting meeples of little\
        faith to your swarm, and battling the other swarms, trying to reduce them to zero (causing the players who\
        controlled them to be removed from the game), to finally remain the last player on board, winning the game.",
    "the most important game mechanic in anaander is that you move your whole swarm at once, every meeple of your\
        color.",
    "in a round, each player can move their swarm once; after all players complete their swarm moves, a new\
        round begins.",
    "the rules for movement are as follows. you may hover your mouse over meeples and terrain tiles to see their\
        individual stats, which may help you better understand these rules.",
    "meeples are two-sided, and in each turn you are allowed to move each meeple only if its current side up\
        matches the current side of the turn.",
    "after each meeple is moved, its side is flipped too, so usually when a meeple is moved in a turn, it also gets\
        to play in the next turn.",
    "meeples can enter a terrain tile only if there is space available in it for the meeple to enter. if a swarm\
        moves in a direction which would cause a meeple to enter a terrain with no space left, the swarm makes its\
        move but the meeple stands still - also, not flipping its side, so it will miss the next turn.",
    "the space available to meeples in the terrains ranges from 1 to 6."
];

const tutorialRemarks: string[][] = [
    [
        "click one of these paragraphs (like the one above, in bold) and the board shows you a scenario where you\
            can easier understand the rules. these bullets will explain the rules in more detail.",
        "on the board shown, notice how the colored pawns, called meeples, move one at a time:\
            first blue, then yellow, green, red, and teal.",
        "black and grey meeples are neutral, while each of the other colors represent a team playing the game.",
        "you are the general who controls the team of your color. generals have silly names, like\
            general info, general warning, general success, general danger and general primary\
            (the last general's name doesn't even make sense)."
    ],
    [
        "this small sample board starts with four meeples, the blue one (general info's team) moves around trying to\
            eliminate her opponents: general warning's yellow team and general success's green team.",
        "first, blue moves left, and eliminates yellow because its faith was strong, but its resistance couldn't\
            take a physical hit from blue.",
        "then blue moves down (let's suppose general success skipped her turn), and finally moves right,\
            onto the green meeple, to convert it - its faith was weak, so it was spared a battle.",
        "notice how blue was able to ignore the fourth meeple, the neutral one (black), because it doesn't belong to\
            any of her opponents - the ones that belonged are now gone, or got converted to general info's cause."
    ],
    [
        "all of the five blue meeples are executing the same instruction in this case: they all move right,\
            at the same time; then down, then left, then up.",
        "you may move some meeples individually when spending extra actions, and some meeples are not able to\
            follow the same movement of the swarm so they will not move, but usually they go with the flow.",
        "since there were no events preventing the movement of the blue meeples, notice how the same formation\
            was conserved at all times.",
        "(no, it's not a glider.)"
    ],
    [
        "hovering the mouse over meeples shows their strength, their resistance and their faith.",
        "and hovering the mouse over the terrain tiles shows the geography of the terrain,\
            and how many more meeples can move into it."
    ],
    [
        "you can tell sides by how colors fill meeples, whether it's the pawn or the background of the circle that\
            is painted with the main color.",
        "the status bar tells which side gets to move (right below where it says who's the current player).",
        "in the example board shown, notice that four blue meeples are on the same side up, and the other blue\
            meeple differs from the others. the turn's side matches those of the four, so only these move.",
        "after all players make their moves, the current turn is flipped."
    ],
    [
        ""
    ],
    [
    ],
    [
    ]
];

const Tutorial: ((props: ITutorialProps) => JSX.Element) = (props: ITutorialProps) => {

    let tutorial: JSX.Element = <br />;

    tutorial =
        <div className="content">
            {tutorialSteps.map((tutorialStep, index) =>
                <div
                    key={index}
                    className="title is-6"
                    onClick={() => props.enqueuePlay({
                        state: "tutorial",
                        player: "default",
                        from: "player",
                        action: { step: index }
                    })}>
                    {
                        index === props.step.step ?
                        <strong>{tutorialStep}</strong> :
                        tutorialStep
                    }
                    {
                        index === props.step.step ?
                        <ul>
                            {tutorialRemarks[index].map((remark, item) =>
                                <li key={item}>{remark}</li>
                            )}
                        </ul>
                        : null
                    }
                </div>
            )}
        </div>;

    return (
        <div id="status" className="tile is-4 is-parent">
            <div className="notification tile is-child">
                <h1 className="title is-2">anaander tutorial</h1>
                <h2 className="subtitle is-4">
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
