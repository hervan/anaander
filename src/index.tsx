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
   future work
------x-x-x------

---------------------------------------------
CREATE TASKS FOR EACH SUBJECT REFERENCED HERE
---------------------------------------------

tier 0 resources testing
tier 1 resources generation by exploration, and storage
buildings construction
tier 2 resources generation by building visitation or pattern formation
tier 2 resource powers activation
objectives testing
objectives handling (receiving, showing, scoring, game ending)
swarms constraints
swarms reach
terrain modifiers

-------------------------------------------------------------
USE THE SEQUENCE BELOW TO VALIDATE THE HYPOTHESES THAT FOLLOW
-------------------------------------------------------------

game progress - figure out how to point to each - draw a graph showing interdependencies
1.  increase swarm
2.  capture city
3.  explore for resources
4.  build a building
5.  activate building benefit

terrains: special powers?
    move into mountain: wait one turn
    leave mountain: move twice
    desert only allows moves on heads side turns
    leaving desert increases faith
    change terrain analogy to some space analogy? planets? systems? galaxies?

multi-tier economy
    tier 0: produced by exploration
          fuel    food    ore    silicon
  desert: fuel                   silicon
   swamp: fuel            ore
mountain:                 ore    silicon
  forest:         food    ore
  plains: fuel    food
  valley:         food           silicon
    tier 1: used for specific powers
   swamp: power plant
mountain: research facility
  forest: silo
  plains: port
  valley: hospital
        - buildings produce sided tokens with the ability, then it gets harvested
        - patterns are applied to the meeples in the formation
        ability                 from        where       token
    x   enhance meeple          valley      pattern     no
        split/join meeple       plains      pattern     no
        re-attack               forest      pattern     no
    x   hold defense            mountain    pattern     no
        remote attack           swamp       pattern     no
    x   breed meeple            valley      building    no
        strengthen city         plains      building    no
        hidden bonuses          forest      building    yes (cards)
        double play             mountain    building    no
        hidden objectives       swamp       building    yes (cards)

hidden objectives
    a) consider whether one of these can be used as game end if presented at the time the condition is fulfilled, or
    b) if they represent something that must be achieved in a single turn, remaining on the table for reactivation
    option (a) requires more complex conditions, (b) requires simpler conditions
1. destroy n enemy buildings from m players
2. gather n (unbuilt) blueprints
3. eliminate n meeples from m players
4. convert n meeples from m players
5. control n cities
6. build n buildings of m types
7. swarm with n meeples
8. n swarms
9. meeple with trait at least n
10. produced n units of given resource during one round
*/
