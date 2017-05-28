import {Construction} from "./Construction";

export type Position = {
    readonly row: number;
    readonly col: number;
};

export const positionToIndex = (position: Position, boardSize: number) =>
    position.row * boardSize + position.col;

export enum Geography {
    sea,
    desert,
    swamp,
    mountain,
    forest,
    plains,
    valley
};

export type Terrain = {
    readonly position: Position;
    readonly geography: Geography;
    readonly spaceLeft: number;
    readonly topMeeple: number;
    readonly construction: Construction;
};

export enum Resource {
    fuel,
    food,
    ore,
    silicon,
    cubit
}

export const GeographyInfo = [
    { type: "sea", piece: null, resources: [] },
    { type: "desert", piece: null, resources: [Resource.fuel, Resource.silicon] },
    { type: "swamp", piece: "i", resources: [Resource.fuel, Resource.ore] },
    { type: "mountain", piece: "l", resources: [Resource.ore, Resource.silicon] },
    { type: "forest", piece: "o", resources: [Resource.food, Resource.ore] },
    { type: "plains", piece: "s", resources: [Resource.fuel, Resource.food] },
    { type: "valley", piece: "t", resources: [Resource.food, Resource.silicon] }
];
