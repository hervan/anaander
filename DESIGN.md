### disclaimer ###
this is not a game design document, just a place to take notes regarding the current stage of the game design.
there are notes elsewhere in the project (issues, Game.ts and index.tsx) that served this purpose; from now on this file should be the proper place for these musings.

# general tabletop interface #
the basic building block of the game rules is a **rule**, which in turn is compiled into a game **manual**. a rule must be
- explained in plain language,
- implement what it says it does, or
- refer to other rules or definitions.

components will be provided for common types of rules, for instance
- setup steps,
- turn/round structure,
- round upkeep,
- game end triggers,
- scoring.

a rule must refer to game items in terms of common **game components**:
- card
- deck
- tile
- meeple
- token
- dice
- tracks
- board
- player boards

and so on.

a **definition** allows the creation of simple game concepts, as well as implicit rules that don't need explanation (or reinforced explanation); an example of basic definition is when you name a token after a resource, like "wood"; another example is for information provided by visual means, like a board showing a map where adjacent regions are obvious to the player.

from this framework, the game engine will be able to show to a player the reasoning behind any applied rule; the game manual can be generated and validated automatically (every rule definition must occur in the manual, no matter the order).

# tasks #
these are well defined design ideas that are ready to become tasks (issues) in the project.
it's not a maturity requirement because many ideas that must be implemented to be validated may end up discarded or evolved into something else;
it just happens that code *and* game are able to receive these changes right now.

- current major changes
  - meeple movement propagation is mandatory
    - swarms won't split or join by simple player choice anymore; they'll occur due to game constraints, like terrains or individual actions (usually related to cards providing an ability)
  - resource consumption/generation is only tested, not requiring work/activation from meeples
- pattern activation gives cards
  - patterns must cycle?
  - charge resources for activation? only pay if player wants to keep or activate?
  - if it becomes just a form of action selection, try restrict further the number of actions per turn
    - floor(empire / 2), for instance
- cards go to an array of actions for each player
  - some are mandatory (table won't skip the turn while it's player's turn)
  - this array will be used to ask for user input
    - in actions which require a target selection, like teleportation
  - need for a global "skip"
- terrain modifiers
  - move into mountain: wait one turn
  - leave mountain: move twice
  - desert deals damage to resistance
  - leaving desert increases faith
- cards
  - card effects last for the remaining of the round (while the phase is still active), so a player must time it properly if it wants to target an adversary with negative effects, or wants to prevent a player from benefitting from positive effects. this gets amplified by a rule change where you can only play cards if you still have meeples "on phase" (available meeples in general).
- swarm handling
  - remove swarm/individual movement options for meeples; enable swarm splitting and other operations by cards - create a card with this option for a price proportional to the meeples moved (maybe those selected can just phase out in place - other options as well?). but this card needs to be relatively common, or keep returning frequently to a players hand, which in turn sounds a lot like deck building, so if it's not possible to create the proper frequency for these cards, create as an alternate option for a discarded card. regarding other options, it may as well be a sort of extra action provided by a card, where players may regularly opt to activate them only in selected meeples, potentially creating split swarms.
- buildings
  - return to the idea of tetramino-shaped buildings? because vehicles with tetramino shapes would be much larger than buildings and cities; rework these sizes a little.

# to be addressed #
ideas that must be implemented in the **current** prototype.
some are already mature but depend on underlying definitions that have not matured yet, so they don't have information concrete enough to become a task.

- tier 2 resource powers remote activation by patterns
  - can they be defined by something else in the game?
    - the current terrain, then forbid reactivation on the same terrain
  - how pattern roles (positions) can play a role in this?

- abilities
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

- obstacles
  - something that must be overcome with an ability or building of the previous terrain
  - provides a sense of progress without a tech tree

- bonuses and abilities are the same thing?
  - for instance, if you force consumption on a terrain, both must pay,
    but only you get vps if you manage to consume it
    - players who can't pay lose vp (proportional)
    - fixed vps? proportional vps would make the card too strong

- bonuses
  - give victory points once it's revealed
  - if revealed at the time it's drawn, gives twice the vp
  - if game ends and it's in hand, takes vp from the player

- objectives
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

- change terrain analogy to some space analogy? planets? systems? galaxies?

# game progress hypothesis #
(work in progress)

these should be guiding steps:
they will explicitly tell what the player must do during the game to get a sense of progression *but* the player can't be told to do these things to preserve game immersion and flow.
therefore the player must reach these steps sequentially by means of underlying mechanics and constraints.
1.  increase swarm (size of 5)
2.  capture valley city (room for 5, easier)
    (order of terrains -> order of buildings: must focus on each stage of the game)
3.  build a school -> factory -> hospital -> station -> research facility
4.  explore for resources
5.  activate ability
6.  ...
