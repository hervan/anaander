// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { ITutorialProps } from "./Table";

const tutorialSteps: JSX.Element[][] = [
    [
        <div>
            welcome to anaander, a game about post-human armies with a shared mind&mdash;veeeeeeery loosely based on
            Ancillary Justice, first novel in the Imperial Radch series by Ann Leckie, where multiple bodies and
            soldiers form a shared consciousness for single entities, like spaceships, or like the Lord of the Radch
            herself.
        </div>,
        <span>
            click on the paragraph below (clicking on paragraphs will give you details about their instructions).
        </span>
    ],
    [
        <div>
            this is the board.
        </div>,
        <span>
            it's usually made of 16&times;16 squares.
        </span>
    ],
    [
        <div>
            these tiny squares are terrain tiles.
        </div>,
        <span>
            hover your mouse over them and you'll see the geography of that terrain, matching its pale color.
        </span>
    ],
    [
        <div>
            this is a meeple.
        </div>,
        <span>
            it's like a pawn inside a circle. also, they're located on top of a terrain tile.
        </span>
    ],
    [
        <div>
            this is a blue meeple.
        </div>,
        <span>
            now it belongs to a player! it matches the color of its owner.
        </span>
    ],
    [
        <div>
            and these are the other colors a meeple can be.
        </div>,
        <span>
            blue, yellow, green, red and teal belong to the player who has been assigned that specific color.
            the black meeple is a <em>neutral</em> one.
        </span>
    ],
    [
        <div>
            this is how a meeple moves.
        </div>,
        <span>
            one at a time, it's moving in each of the possible directions:
            up, right, down, left&mdash;no diagonals allowed.
        </span>
    ],
    [
        <div>
            a meeple moved on top of another meeple!
        </div>,
        <span>
            that's because the neutral meeple was in standing in the way of the blue meeple, so the blue meeple climbed
            on top of the neutral meeple. they're occupying the same terrain now.
        </span>
    ],
    [
        <div>
            a meeple changed its color!
        </div>,
        <span>
            it was a <em>conversion</em>, it got converted to another player's cause! how? when you mouse over these
            meeples, pay attention to their stats, particularly <em>faith</em>. neutral meeple's faith was much lower
            than blue meeple's faith. so the first thing a meeple does when it moves on top of another meeple is to try
            to convert it, and if it's successful, it will change its color <em>peacefully</em> (notice how the
            converted meeple didn't change its stats after the conversion).
        </span>
    ],
    [
        <div>
            so what happens if two meeples are stronger in their faith? things get <i>unpeaceful</i>?
        </div>,
        <span>
            yeah, they'll hit each other with their <em>strength</em> (another stat shown when you move your mouse over
            meeples). after a hit, a meeple loses <em>resistance</em> equal to the hit taken, so each meeple leaves the
            encounter weaker. oh, notice that each meeple only strikes the other <em>once</em>, in the event that
            another meeple climbed on top of another meeple.
        </span>
    ],
    [
        <div>
        </div>,
        <span>
        </span>
    ]
];
/*
    <div>your swarm is composed of every meeple of your color; you move around the map converting meeples of little\
        faith to your swarm, and battling the other swarms, trying to reduce them to zero (causing the players who\
        controlled them to be removed from the game), to finally remain the last player on board, winning the\
        game.</div>,
    <div>the most important game mechanic in anaander is that you move your whole swarm at once, every meeple of your\
        color.</div>,
    <div>in a round, each player can move their swarm once; after all players complete their swarm moves, a new\
        round begins.</div>,
    <div>the rules for movement are as follows. you may hover your mouse over meeples and terrain tiles to see their\
        individual stats, which may help you better understand these rules.</div>,
    <div>meeples are two-sided, and in each turn you are allowed to move each meeple only if its current side up\
        matches the current side of the turn.</div>,
    <div>after each meeple is moved, its side is flipped too, so usually when a meeple is moved in a turn, it also\
        gets to play in the next turn.</div>,
    <div>meeples can enter a terrain tile only if there is space available in it for the meeple to enter. if a swarm\
        moves in a direction which would cause a meeple to enter a terrain with no space left, the swarm makes its\
        move but the meeple stands still - also, not flipping its side, so it will miss the next turn.</div>,
    <div>the space available to meeples in the terrains ranges from 1 to 6.</div>,
    <div>click one of these paragraphs (like the one above, in bold) and the board shows you a scenario where you\
        can easier understand the rules. these bullets will explain the rules in more detail.</div>,
    <div>on the board shown, notice how the colored pawns, called meeples, move one at a time:\
        first blue, then yellow, green, red, and teal.</div>,
    <div>black and grey meeples are neutral, while each of the other colors represent a team playing the\
        game.</div>,
    <div>you are the general who controls the team of your color. generals have silly names, like\
        general info, general warning, general success, general danger and general primary\
        (the last general's name doesn't even make sense).</div>,
    <span>this small sample board starts with four meeples, the blue one (general info's team) moves around trying\
        to eliminate her opponents: general warning's yellow team and general success's green team.</span>,
    <span>first, blue moves left, and eliminates yellow because its faith was strong, but its resistance couldn't\
        take a physical hit from blue.</span>,
    <span>then blue moves down (let's suppose general success skipped her turn), and finally moves right,\
        onto the green meeple, to convert it - its faith was weak, so it was spared a battle.</span>,
    <span>notice how blue was able to ignore the fourth meeple, the neutral one (black), because it doesn't belong\
        to any of her opponents - the ones that belonged are now gone, or got converted to general info's\
        cause.</span>,
    <span>all of the five blue meeples are executing the same instruction in this case: they all move right,\
        at the same time; then down, then left, then up.</span>,
    <span>you may move some meeples individually when spending extra actions, and some meeples are not able to\
        follow the same movement of the swarm so they will not move, but usually they go with the flow.</span>,
    <span>since there were no events preventing the movement of the blue meeples, notice how the same formation\
        was conserved at all times.</span>,
    <span>(no, it's not a glider.)</span>,
    <span>hovering the mouse over meeples shows their strength, their resistance and their faith.</span>,
    <span>and hovering the mouse over the terrain tiles shows the geography of the terrain,\
        and how many more meeples can move into it.</span>,
    <span>you can tell sides by how colors fill meeples, whether it's the pawn or the background of the circle that\
        is painted with the main color.</span>,
    <span>the status bar tells which side gets to move (right below where it says who's the current player).</span>,
    <span>in the example board shown, notice that four blue meeples are on the same side up, and the other blue\
        meeple differs from the others. the turn's side matches those of the four, so only these move.</span>,
    <span>after all players make their moves, the current turn is flipped.</span>
*/

const Tutorial: ((props: ITutorialProps) => JSX.Element) = (props: ITutorialProps) => {

    let tutorial: JSX.Element = <br />;

    tutorial =
        <div className="content">
            {tutorialSteps.map(([ tutorialStep, tutorialDetail ], index) =>
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
                        <div>
                            <strong>{tutorialStep}</strong>
                            {tutorialDetail}
                        </div> :
                        tutorialStep
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
                    })}>here</a> to go back.)
                </h2>
                {tutorial}
            </div>
        </div>
    );
};

export default Tutorial;
