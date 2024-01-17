import { Color } from "./Color";

export interface Brick {
    length: number
    width: number
    height: number
    color: Color
};

const make_brick = function (l: number, w: number, h: number, r: number, g: number, b: number): Brick {
    return {
        length: l,
        width: w,
        height: h,
        color: {
            red: r,
            green: g,
            blue: b,
            alpha: 1
        }
    }
};

export const BRICK_LIST = [
    make_brick(4, 2, 1, 1, 0, 0),
    make_brick(4, 2, 1, 0, 1, 0),
    make_brick(4, 2, 1, 0, 0, 1),
    make_brick(1, 1, 1, 1, 0, 0),
    make_brick(1, 1, 1, 0, 1, 0),
    make_brick(1, 1, 1, 0, 0, 1),
];