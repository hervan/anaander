import {Side} from "./Meeple";
import {Team} from "./Player";
import {Position} from "./Terrain";

export type Construction =
| Building
| City
| EmptySite;

export type City = {
    readonly type: "city";
    readonly key: number;
    readonly name: string;
    readonly defense: number;
    readonly team: Team;
};

export const Buildings: { [key: string]: string } = {
    i: "research facility",
    l: "power plant",
    o: "school",
    s: "station",
    t: "hospital"
};

type Building = {
    readonly type: "building";
    readonly name: string;
    readonly blueprint: string;
    readonly team: Team;
    readonly side: Side;
};

export type BuildingPhase =
| "notbuilt"
| "blueprint"
| "built";

export type EmptySite = {
    readonly type: "emptysite";
    readonly production: number[];
    readonly resources: number[];
};

export enum Piece {
    i,
    l,
    o,
    s,
    t
};

export const pieceShapes: Array<{ i: number, piece: string, shape: Position[] }> = [
    { i: 0, piece: "i", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 3, col: 0}] },
    { i: 1, piece: "l", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 2, col: 1}] },
    { i: 2, piece: "o", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 0, col: 1}] },
    { i: 3, piece: "s", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 2, col: 1}] },
    { i: 4, piece: "t", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 1, col: 1}] }
];
