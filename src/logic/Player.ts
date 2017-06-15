import Card from "./Card";
import {BuildingPhase} from "./Construction";

export type Player = {
    readonly controller: Controller;
    readonly team: Team;
    readonly swarmSize: number;
    readonly cities: number[];
    readonly resources: number[];
    readonly hand: ReadonlyArray<{
        readonly key: number;
        readonly acquisitionRound: number;
    }>;
    readonly buildingPhase: BuildingPhase[];
    readonly vp: number;
};

type Controller = "human" | "computer" | "npc" | "network";

export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
};
