import { Game, setup, play, logBoard } from "../src/Game";

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

        const setup_game: Game = setup(2, 4);

        game = play(setup_game, {
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

        const move_game1: Game = play(game, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "up"
        });

        const move_game2: Game = play(move_game1, {
            state: "play",
            player: move_game1.currentPlayer,
            from: "player",
            action: "up"
        });

        const move_game3: Game = play(move_game2, {
            state: "play",
            player: move_game2.currentPlayer,
            from: "player",
            action: "right"
        });

        const move_game4: Game = play(move_game3, {
            state: "play",
            player: move_game3.currentPlayer,
            from: "player",
            action: "right"
        });

        const move_game5: Game = play(move_game4, {
            state: "play",
            player: move_game4.currentPlayer,
            from: "player",
            action: "down"
        });

        const move_game6: Game = play(move_game5, {
            state: "play",
            player: move_game5.currentPlayer,
            from: "player",
            action: "down"
        });

        const move_game7: Game = play(move_game6, {
            state: "play",
            player: move_game6.currentPlayer,
            from: "player",
            action: "left"
        });

        const move_game8: Game = play(move_game7, {
            state: "play",
            player: move_game7.currentPlayer,
            from: "player",
            action: "left"
        });

        expect(move_game8.terrains.reduce((acc, terrain) =>
            terrain.topMeeple > -1 ? acc + 1 : acc, 0))
        .toBeGreaterThanOrEqual(2);
    });
});
