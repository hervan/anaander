// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { Direction } from "../Game";

import { ITutorialProps } from "./Table";

const tutorialSteps: Array<Array<JSX.Element | Direction[]>> = [
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
            it&rsquo;s usually made of 16&times;16 squares.
        </span>
    ],
    [
        <div>
            these tiny squares are terrain tiles.
        </div>,
        <span>
            hover your mouse over them and you&rsquo;ll see the geography of that terrain, matching its pale color.
        </span>
    ],
    [
        <div>
            this is a meeple.
        </div>,
        <span>
            it&rsquo;s like a pawn inside a circle. also, they&rsquo;re located on top of a terrain tile.
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
            one at a time, it&rsquo;s moving in each of the possible directions:
            up, right, down, and left&mdash;no diagonals allowed.
        </span>,
        [ "up", "right", "down", "left" ]
    ],
    [
        <div>
            a meeple moved on top of another meeple!
        </div>,
        <span>
            that&rsquo;s because the neutral meeple was in standing in the way of the blue meeple, so the blue meeple
            climbed on top of the neutral meeple. they&rsquo;re occupying the same terrain now. on a future turn, only
            the top meeple is free to move out of this square. other meeples have to wait until there&rsquo;s no other
            meeple on top of them.
        </span>,
        [ "right", "left" ]
    ],
    [
        <div>
            a meeple changed its color!
        </div>,
        <span>
            it was a <em>conversion</em>, it got converted to another player&rsquo;s cause! how? when you mouse over
            these meeples, pay attention to their stats, particularly <em>faith</em>. neutral meeple&rsquo;s faith was
            much lower than blue meeple&rsquo;s faith. so the first thing a meeple does when it moves on top of another
            meeple is to try to convert it, and if it&rsquo;s successful, it will change its color <em>peacefully</em>
            (notice how the converted meeple didn&rsquo;t change its stats after conversion).
        </span>,
        [ "up", "up", "left", "left" ]
    ],
    [
        <div>
            so what happens if two meeples are stronger in their faith? things get <i>unpeaceful</i>?
        </div>,
        <span>
            yeah, they&rsquo;ll hit each other with their <em>strength</em> (another stat shown when you move your mouse
            over meeples). after a hit, a meeple loses <em>resistance</em> equal to the hit taken, so each meeple leaves
            the encounter weaker. oh, notice that each meeple only strikes the other <em>once</em>, in the event that
            another meeple climbed on top of another meeple.
        </span>,
        [ "up", "up", "left", "left" ]
    ],
    [
        <div>
            eventually a meeple&rsquo;s resistance will reach zero, right?
        </div>,
        <span>
            well, if that happens&hellip; the meeple dies! sad, but obvious, isn&rsquo;t it? also, that needs to happen
            quite a lot if you want to win the game&mdash;you need to remove every opponent&rsquo;s meeple from the game
            in order to remove that player from the game, which in turn will make you the winner if you manage to
            eliminate all players from game. well, except you, just to be clear: in case you eliminate your last
            opponent <em>and</em> you get killed at the same time, the game is a tie.
        </span>,
        [ "up", "up", "left", "left" ]
    ],
    [
        <div>
            now, regarding all those meeples you converted, here comes the core mechanic of the game&mdash;
            <em>the swarm</em>.
        </div>,
        <span>
            the swarm is the collective of all meeples of your color. they move as a single entity, each meeple
            performing the same action assigned that round to the swarm by the player. that is, as long as they can
            perform the action; all restrictions to individual meeples apply as well to each meeple in the swarm.
        </span>
    ],
    [
        <div>
            speaking of movement restrictions, let&rsquo;s talk about them.
        </div>,
        <span>
            we mentioned about how <em>meeples on top of other meeples</em> will block meeples from taking an action;
            a meeple <em>can&rsquo;t leave the board</em> from the edges, as it would obviously fall from the board;
            and there&rsquo;s the <em>terrain</em> restriction&mdash;each geography has a maximum meeple capacity.
            whenever a meeple in any of these situations tries to move, it doesn&rsquo;t complete the action;
            if it happens as part of the swarm movement, the other meeples in the swarm are unaffected and may try to
            complete their own movements, as explained in the previous step of the tutorial.
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
players take alternate turns.
in a round, each player can move their swarm once; after all players complete their swarm moves, a new round begins.
meeples are two-sided, and in each turn you are allowed to move each meeple only if its current side up matches the
current side of the turn.
after each meeple is moved, its side is flipped too, so usually when a meeple is moved in a turn, it also gets to play
in the next turn.
meeples can enter a terrain tile only if there is space available in it for the meeple to enter. if a swarm moves in a
direction which would cause a meeple to enter a terrain with no space left, the swarm makes its move but the meeple
stands still - also, not flipping its side, so it will miss the next turn.
the space available to meeples in the terrains ranges from 1 to 6, according to the terrain geography.
you are the general who controls the team of your color. generals have silly names, like general info, general warning,
general success, general danger and general primary (the last general's name doesn't even make sense).
notice how blue was able to ignore the fourth meeple, the neutral one (black), because it doesn't belong to any of her
opponents - the ones that belonged are now gone, or got converted to general info's cause.
some meeples are not able to follow the same movement of the swarm so they will not move, but usually they go with the
flow.
after all players make their moves, the current turn is flipped.
only the top meeple in a terrain is free to move. others are free to do other things?
*/

const Tutorial: ((props: ITutorialProps) => JSX.Element) = (props: ITutorialProps) => {

    let tutorial: JSX.Element = <br />;

    tutorial =
        <div className="content">
            {tutorialSteps
                .map(([ tutorialStep, tutorialDetail, tutorialActions ], i) =>
                <div
                    key={i}
                    className="title is-6"
                    onClick={() => props.enqueuePlay({
                        state: "tutorial",
                        player: "default",
                        from: "player",
                        action: { step: i }
                    })}>
                    {
                        i === props.step.step ?
                        <div>
                            <strong>{tutorialStep}</strong>
                            {tutorialDetail}
                            <p>
                                {tutorialActions ? (tutorialActions as Direction[]).map((move, j) =>
                                    <a key={j} className={"button is-small is-outlined is-info"}>
                                        <span className="icon is-small">
                                            <i className={"fa fa-hand-o-" + move}></i>
                                        </span>
                                    </a>) :
                                null}
                            </p>
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
