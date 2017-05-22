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
       TBA
------x-x-x------

change terrain analogy to some space analogy? planets? systems? galaxies?
tier 2 resource powers remote activation by patterns
    - should the pattern change each time it's activated?
    - can they be defined by something else in the game?
        - the current terrain? (terrain-building affinity)
        - then forbid the reactivation on the same terrain?
        - patterns rotated or patterns refilled as a pool once it's empty?
    - how pattern roles (positions) can play a role in this?
effects
    - over swarms
    - over cities
    - over meeples on a terrain patch
    - over terrain specs themselves
        - speed
        - production
        - penalties
            - desert that doesn't deal a damage is thematic for agricultural advances
                - but also won't increase faith
player profiles
    - more chips for the player who has less faith
    - more energy for the player who is greedy for power (more cities)
    - more ore for the player who believes in hard work (more meeples)
terrain modifiers
    - move into mountain: wait one turn
    - leave mountain: move twice
    - desert deals damage to resistance
    - leaving desert increases faith
meeple stats
    - movement
swarm restraints
    - must it be fed?
abilities
    - remote attack
    - double play
    - activation applied to neighbours
bonuses
    - give victory points once it's revealed
    - if game ends and it's in hand, penalizes player
objectives
    - must be revealed for game ending
    - may also give vp
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

----------------------------------------------------------
DEFINE A SEQUENCE TO VALIDATE THE GAME PROGRESS HYPOTHESIS
----------------------------------------------------------

figure out how to point to each step
draw a graph showing interdependencies
1.  increase swarm
2.  capture city
3.  explore for resources
4.  build a building
5.  activate building benefit

*/
