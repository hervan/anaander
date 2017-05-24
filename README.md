# anaander
a turn-based strategy board game where all your units belong to a hive mind

https://hervan.github.io/anaander/

## the game

you start the game with a **[meeple](https://en.wiktionary.org/wiki/meeple)** and one **action** per turn to take it around the world and build your empire.

one action allows you to
- **move** a meeple to adjacent terrains (square **tiles**), or
- **explore** the current tile where it's standing.

when you move to a tile where there's a meeple who's not on your **team** (you can tell by meeple colors), there's a conflict.
- if your meeple has a stronger **faith** than the other, you'll **convert** it to your team -- your **swarm** just increased!
- otherwise they'll **battle**, just taking from each other's **resistance** an amount equal to the attacker's **strength**.

notice how your first meeple is a little stronger than the neutral meeples around&mdash;these numbers are listed on each player's **tableau**, a space for each player in a board game where players control their resources and actions.

after converting a meeple, both meeples remain on the same tile, the last to enter being **on top** of the meeple who was there before. a meeple below another can't take an action until the top meeple leaves the tile.

now every action chosen for you meeple is repeated by other meeples in the swarm&mdash;neighbours to a meeple, and their neighbours. this is the core [mechanic](https://en.wikipedia.org/wiki/Game_mechanics) of the game, and you'll have to deal with its benefits and liabilities to succeed in the game.

now that you have a swarm and know how to handle it, you can take a stab at conquering a **city**&mdash;cities don't attack you back, but you have to enter it with enough meeples that the sum of their strengths is greater than the city's defense. a city's defense is also shown in the tableau, if you happen to be on a tile with a city in it; conquered cities are also shown constantly in your tableau, because they're a part of your empire now and, surprise, they give you an **extra** action!

#### (below this point is just a sketch) ####

you may move meeples independently from the swarm, by with extra actions, you're able to do both.

rounds and meeples have **sides** (heads, a meeple with a painted head, or tails, a meeple with a painted background), and each round you can only move meeples on the same side ("phase").

you can use extra actions to form the tetramino pattern represented in your tableu - a **blueprint** taken from the technologies of the conquered city.

after positioning your meeples in the formation specified by the blueprint, when you choose to explore on an empty terrain (no constructions or enemies), you'll build the **building** for that blueprint. the tile will change its color to make it clear who owns it.

you can enter buildings and reap their benefits, but they also have sides and you'll only enter a building's tile if you obey its side.

if you enter an enemy's building, you'll get the opposite effect of that benefit - an hospital you own increases your meeple's resistance by ten percent, but it will take ten percent from the resistance of an enemy meeple.

you can't build twice of each kind of building, but if you repeat that pattern after it's built, you'll **remotely activate** it's abilities, getting a **card** from a **deck**.

activate now, **discarding** the card.

activate later, paying an **activation cost**, in **resources**, gathered from exploration.

sometimes a card with no benefit in-game will give **victory points**.

some cards will trigger the **game end**, three of them must be activated in the same round, or five by the same player in different rounds, or nine in the whole game no matter the player.

player with most victory points is the **winner**.

## the software ##

anaander is a single page application written in TypeScript, using React for html rendering (no canvas).

to run your local copy:
```bash
git clone https://github.com/hervan/anaander
cd anaander/
npm install
```
then run
```bash
npm start
```
if you wish to start a static local server and open the game at http://localhost:8080/

otherwise, run
```bash
code .
```
if you have Visual Studio Code installed; this will open the project in vscode with debugging in chrome (windows and linux) already set.

finally, to publish it to github-pages, just run
```bash
npm run deploy
```
