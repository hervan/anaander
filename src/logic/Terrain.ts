import { Position } from "../logic/Common";
import { Construction } from "./Construction";

export type Terrain = {
    readonly position: Position;
    readonly geography: Geography;
    readonly spaceLeft: number;
    readonly topMeeple: number;
    readonly construction: Construction;
};

export enum Geography {
    sea,
    desert,
    swamp,
    mountain,
    forest,
    plains,
    valley
};
