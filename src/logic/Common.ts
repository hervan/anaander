export type Position = {
    readonly row: number;
    readonly col: number;
};

export enum Side {
    heads,
    tails,
    none
};

export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
};

export const positionToIndex = (position: Position, boardSize: number) =>
    position.row * boardSize + position.col;
