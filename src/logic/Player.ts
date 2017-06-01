import Card from "./Card";
import {BuildingPhase} from "./Construction";

export type Player = {
    readonly team: Team;
    readonly swarmSize: number;
    readonly cities: number[];
    readonly resources: number[];
    readonly hand: ReadonlyArray<Card>;
    readonly buildingPhase: BuildingPhase[];
    readonly usedActions: number;
    readonly vp: number;
};

export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
};
