import { Game, logBoard, play, setup } from "../src/Game";

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
            meeple.team !== "default").length)
            .toBeGreaterThanOrEqual(game.players.length);
    });
});

describe("first player move", () => {

    let game: Game;

    beforeAll(() => {

        const setupGame: Game = setup(2, 4);

        game = play(setupGame, {
            state: "play",
            player: "default",
            from: "player",
            action: null
        });

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
            meeple.team !== "default" ? acc + 1 : acc, 0))
            .toBeGreaterThanOrEqual(2);
    });

    it("find 2 non-neutral meeples on the board", () => {

        const moveGame1: Game = play(game, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "up"
        });

        const moveGame2: Game = play(moveGame1, {
            state: "play",
            player: moveGame1.currentPlayer,
            from: "player",
            action: "up"
        });

        const moveGame3: Game = play(moveGame2, {
            state: "play",
            player: moveGame2.currentPlayer,
            from: "player",
            action: "right"
        });

        const moveGame4: Game = play(moveGame3, {
            state: "play",
            player: moveGame3.currentPlayer,
            from: "player",
            action: "right"
        });

        const moveGame5: Game = play(moveGame4, {
            state: "play",
            player: moveGame4.currentPlayer,
            from: "player",
            action: "down"
        });

        const moveGame6: Game = play(moveGame5, {
            state: "play",
            player: moveGame5.currentPlayer,
            from: "player",
            action: "down"
        });

        const moveGame7: Game = play(moveGame6, {
            state: "play",
            player: moveGame6.currentPlayer,
            from: "player",
            action: "left"
        });

        const moveGame8: Game = play(moveGame7, {
            state: "play",
            player: moveGame7.currentPlayer,
            from: "player",
            action: "left"
        });

        expect(moveGame8.terrains.reduce((acc, terrain) =>
            terrain.topMeeple > -1 ? acc + 1 : acc, 0))
        .toBeGreaterThanOrEqual(2);
    });
});
