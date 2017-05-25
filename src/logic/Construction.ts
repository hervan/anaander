import { Side, Team } from "./Common";

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

const Buildings: { [key: string]: string } = {
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

type BuildingPhase =
| "notbuilt"
| "blueprint"
| "built";

type EmptySite = {
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
