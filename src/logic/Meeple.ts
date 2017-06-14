import {Team} from "./Player";
import {Position} from "./Terrain";

export enum Phase {
    high,
    low,
    off
};

export type Meeple = {
    readonly key: number;
    readonly position: Position;
    readonly team: Team;
    readonly phase: Phase;
    readonly strength: number;
    readonly resistance: number;
    readonly faith: number;
    readonly speed: number;
    readonly topsMeeple: number;
};
