// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as ReactDOM from "react-dom";

import "bulma/css/bulma.css";

import { Table } from "./components/Table";

import "./anaander.css";

ReactDOM.render(
    <Table />,
    document.getElementById("root")
);

/*
------x-x-x------
      TASKS
------x-x-x------

pattern activation gives cards
    - patterns must cycle?
    - charge resources for activation? only pay if player wants to keep or activate?
    - if it becomes just a form of action selection, try restrict further the number of actions per turn
        - floor(empire / 2), for instance
cards go to an array of actions for each player
    - some are mandatory (table won't skip the turn while it's player's turn)
    - this array will be used to ask for user input
        - in actions which require a target selection, like teleportation
    - need for a global "skip"
terrain modifiers
    - move into mountain: wait one turn
    - leave mountain: move twice
    - desert deals damage to resistance
    - leaving desert increases faith

------x-x-x------
       TBA
------x-x-x------

change terrain analogy to some space analogy? planets? systems? galaxies?
tier 2 resource powers remote activation by patterns
    - can they be defined by something else in the game?
        - the current terrain, then forbid reactivation on the same terrain
    - how pattern roles (positions) can play a role in this?
abilities
    - remote attack
        1. pays resources to activate a pattern for a building
        2. activates a pattern
        3. buys from a deck for that building
        4. receives a card, it's a remote attack
        5. spend it this turn for (n - 1) taxicab distance
        6. spend it later for (n - 1)*(n - 1) taxicab distance
    - double play
        1. pays resources to activate a pattern for a building
        2. activates a pattern
        3. buys from a deck for that building
        4. receives a card, it's a double play
        5. spend it this turn when all actions are used, flipping
        6. spend it later for (n - 1)*(n - 1) taxicab distance
    - force feeding, energy consumption (resources in general)
        - paid as the reach defined by the card target
    - reduce speed to 0
    - targets
        - neighbours (measured by taxicab distance)
        - swarms
        - terrain patch (either the one the meeple is on, either of a city)
            - for the meeples in them, or for the terrains themselves
    - terrain specs themselves
        - speed
            - increase speed is thematic for technological advances
        - production
            - increase production is thematic for agricultural advances
        - penalties
            - desert that doesn't deal a damage is thematic for agricultural advances
                - but also won't increase faith
obstacles
    - something that must be overcome with an ability or building of the previous terrain
    - provides a sense of progress without a tech tree
bonuses and abilities are the same thing?
    - for instance, if you force consumption on a terrain, both must pay,
      but only you get vps if you manage to do it
        - players who can't pay lose vp (proportional)
        - fixed vps? proportional vps would make the card too strong
bonuses
    - give victory points once it's revealed
    - if revealed at the time it's drawn, gives twice the vp
    - if game ends and it's in hand, takes vp from the player
objectives
    - at game start: buy 3, keeps 2
    - when 3 are revealed by one player, game ends
    - may also give vp at the time of revelation (no penalty if not completed)
1.  eliminate n meeples from m players
2.  convert n meeples from m players
3.  control n cities
4.  take over n cities from m players
5.  build n buildings of m types
6.  swarm with n meeples
7.  n swarms
8.  meeple with trait at least n
9.  produced n units of given resource during one round
10. stocked n units of given resource at a moment
11. consecutive damage/kill by a meeple (to reward swarm clashes, variable)
12. damage/kill by a meeple in one move (to reward swarm clashes, variable)

----------------------------------------------------------
DEFINE A SEQUENCE TO VALIDATE THE GAME PROGRESS HYPOTHESIS
----------------------------------------------------------

figure out how to point to each step
draw a graph showing interdependencies
1.  increase swarm (size of 5)
2.  capture valley city (room for 5, easier)
    (order of terrains -> order of buildings: must focus on each stage of the game)
3.  build a school -> factory -> hospital -> station -> research facility
4.  explore for resources
5.  activate ability

*/
