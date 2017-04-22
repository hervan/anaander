import {
    Action,
    begin,
    Game,
    logBoard,
    play,
    selectSwarm,
    setup,
    Team
} from "../src/Game";

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
            team: game.currentTeam,
            from: {
                selection: "swarm",
                swarm: game.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(game, position).length > 0)
            },
            action: Action.up
        });

        const moveGame2: Game = play(moveGame1, {
            team: moveGame1.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame1.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame1, position).length > 0)
            },
            action: Action.up
        });

        const moveGame3: Game = play(moveGame2, {
            team: moveGame2.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame2.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame2, position).length > 0)
            },
            action: Action.right
        });

        const moveGame4: Game = play(moveGame3, {
            team: moveGame3.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame3.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame3, position).length > 0)
            },
            action: Action.right
        });

        const moveGame5: Game = play(moveGame4, {
            team: moveGame4.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame4.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame4, position).length > 0)
            },
            action: Action.down
        });

        const moveGame6: Game = play(moveGame5, {
            team: moveGame5.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame5.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame5, position).length > 0)
            },
            action: Action.down
        });

        const moveGame7: Game = play(moveGame6, {
            team: moveGame6.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame6.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame6, position).length > 0)
            },
            action: Action.left
        });

        const moveGame8: Game = play(moveGame7, {
            team: moveGame7.currentTeam,
            from: {
                selection: "swarm",
                swarm: moveGame7.meeples
                    .map((meeple) => meeple.position)
                        .find((position) => selectSwarm(moveGame7, position).length > 0)
            },
            action: Action.left
        });

        expect(moveGame8.terrains.reduce((acc, terrain) =>
            terrain.topMeeple > -1 ? acc + 1 : acc, 0))
        .toBeGreaterThanOrEqual(3);
    });
});
