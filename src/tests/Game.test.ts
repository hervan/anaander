import {
    Action,
    begin,
    Game,
    play,
    selectSwarm,
    setup
} from "../logic/Game";
import {Team} from "../logic/Player";

function logBoard(game: Game): void {

    const teamSymbol: { [key: string]: string } = {
        info: "1",
        warning: "2",
        success: "3",
        danger: "4",
        primary: "5",
        default: "0"
    };

    const board: string = game.terrains.reduce(((acc, terrain, index) =>
        acc + (terrain.topMeeple === -1 ? "#" : teamSymbol[game.meeples[terrain.topMeeple].team])
            + (index % game.boardSize === game.boardSize - 1 ? "\n" : "")), "");

    console.log(board);
}

describe("game setup with 2 players on a 4x4 board", () => {

    let game: Game;

    beforeAll(() => {

        game = setup(2, 4);
    });

    it("find 2 players at the table", () => {

        expect(game.players.length).toEqual(2);
    });

    it("find at least 2 meeples on the table", () => {

        expect(game.meeples.length).toBeGreaterThanOrEqual(2);
    });

    it("find 2 non-neutral meeples on the table", () => {
        expect(game.meeples.filter((meeple) =>
            meeple.team !== Team.default).length)
            .toBeGreaterThanOrEqual(game.players.length);
    });
});

describe("first player move", () => {

    let game: Game;

    beforeAll(() => {

        const setupGame: Game = setup(2, 4);

        game = begin(setupGame);

        logBoard(game);
    });

    it("find 2 players at the table", () => {

        expect(game.players.length).toEqual(2);
    });

    it("find at least 2 meeples on the table", () => {

        expect(game.meeples.length).toBeGreaterThanOrEqual(2);
    });

    it("find 2 non-neutral meeples on the table", () => {

        expect(game.meeples.reduce((acc, meeple) =>
            meeple.team !== Team.default ? acc + 1 : acc, 0))
            .toBeGreaterThanOrEqual(2);
    });

    it("find 2 non-neutral meeples on the board", () => {

        const moveGame1: Game = play(game, {
            team: game.turn.team,
            selection: selectSwarm(game, game.meeples[0].position),
            action: Action.up
        });

        const moveGame2: Game = play(moveGame1, {
            team: moveGame1.turn.team,
            selection: selectSwarm(moveGame1, moveGame1.meeples[0].position),
            action: Action.up
        });

        const moveGame3: Game = play(moveGame2, {
            team: moveGame2.turn.team,
            selection: selectSwarm(moveGame2, moveGame2.meeples[0].position),
            action: Action.right
        });

        const moveGame4: Game = play(moveGame3, {
            team: moveGame3.turn.team,
            selection: selectSwarm(moveGame3, moveGame3.meeples[0].position),
            action: Action.right
        });

        const moveGame5: Game = play(moveGame4, {
            team: moveGame4.turn.team,
            selection: selectSwarm(moveGame4, moveGame4.meeples[0].position),
            action: Action.down
        });

        const moveGame6: Game = play(moveGame5, {
            team: moveGame5.turn.team,
            selection: selectSwarm(moveGame5, moveGame5.meeples[0].position),
            action: Action.down
        });

        const moveGame7: Game = play(moveGame6, {
            team: moveGame6.turn.team,
            selection: selectSwarm(moveGame6, moveGame6.meeples[0].position),
            action: Action.left
        });

        const moveGame8: Game = play(moveGame7, {
            team: moveGame7.turn.team,
            selection: selectSwarm(moveGame7, moveGame7.meeples[0].position),
            action: Action.left
        });

        expect(moveGame8.terrains.reduce((acc, terrain) =>
            terrain.topMeeple > -1 ? acc + 1 : acc, 0))
        .toBeGreaterThanOrEqual(3);
    });
});
