import {Team} from "./Player";
import {Position} from "./Terrain";

export enum Side {
    heads,
    tails,
    none
};

export type Meeple = {
    readonly key: number;
    readonly position: Position;
    readonly team: Team;
    readonly side: Side;
    readonly strength: number;
    readonly resistance: number;
    readonly faith: number;
    readonly speed: number;
    readonly topsMeeple: number;
};
