
import {BuildingPhase} from "./Construction";

export type Player = {
    readonly team: Team;
    readonly swarmSize: number;
    readonly cities: number[];
    readonly resources: number[];
    readonly buildingPhase: BuildingPhase[];
    readonly usedActions: number;
};

export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
};
