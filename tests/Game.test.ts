import { Game, setup, play, log_board } from "../src/Game";

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

    it("find 2 colored meeples on the table", () => {

        expect(game.meeples.reduce((acc, meeple) =>
            meeple.color !== "default" ? acc + 1 : acc, 0))
            .toBe(2);
    });

    it("find 2 meeples owned by the players", () => {

        expect(game.players.reduce((acc2, player) =>
            acc2 + player.meeples.reduce((acc1, meeple) =>
                meeple.color !== "default" ? acc1 + 1 : acc1, 0), 0))
            .toBe(2);
    });

    it("find 2 colored meeples on the board", () => {

        expect(game.terrains.reduce((acc2, terrain) =>
            acc2 + terrain.meeples.reduce((acc1, meeple) =>
            meeple.color !== "default" ? acc1 + 1 : acc1, 0), 0))
            .toBe(2);
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

        log_board(game);
    });

    it("find 2 players at the table", () => {

        expect(game.players.length).toEqual(2);
    });

    it("find at least 2 meeples on the table", () => {

        expect(game.meeples.length).toBeGreaterThanOrEqual(2);
    });

    it("find 2 colored meeples on the table", () => {

        expect(game.meeples.reduce((acc, meeple) =>
            meeple.color !== "default" ? acc + 1 : acc, 0))
            .toBe(2);
    });

    it("find 2 meeples owned by the players", () => {

        expect(game.players.reduce((acc2, player) =>
            acc2 + player.meeples.reduce((acc1, meeple) =>
                meeple.color !== "default" ? acc1 + 1 : acc1, 0), 0))
            .toBe(2);
    });

    it("find 2 colored meeples on the board", () => {

        const move_game1: Game = play(game, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "up"
        });
        console.log(move_game1.lastAction);

        const move_game2: Game = play(move_game1, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "up"
        });
        console.log(move_game2.lastAction);

        log_board(move_game2);

        const move_game3: Game = play(move_game2, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "right"
        });
        console.log(move_game3.lastAction);

        const move_game4: Game = play(move_game3, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "right"
        });
        console.log(move_game4.lastAction);

        log_board(move_game4);

        const move_game5: Game = play(move_game4, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "down"
        });
        console.log(move_game5.lastAction);

        const move_game6: Game = play(move_game5, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "down"
        });
        console.log(move_game6.lastAction);

        log_board(move_game6);

        const move_game7: Game = play(move_game6, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "left"
        });
        console.log(move_game7.lastAction);

        const move_game8: Game = play(move_game7, {
            state: "play",
            player: game.currentPlayer,
            from: "player",
            action: "left"
        });
        console.log(move_game8.lastAction);

        log_board(move_game8);

        expect(move_game8.terrains.reduce((acc2, terrain) =>
            acc2 + terrain.meeples.reduce((acc1, meeple) =>
            meeple.color !== "default" ? acc1 + 1 : acc1, 0), 0))
            .toBe(2);
    });
});
