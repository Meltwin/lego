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
            red: r / 256,
            green: g / 256,
            blue: b / 256,
            alpha: 1
        }
    }
};

const SHAPE_LIST = [
    [2, 3, 1],
    [1, 1, 1],
    [1, 4, 1],
    [2, 4, 1],
    [1, 6, 1],
    [1, 8, 1],
    [2, 6, 1],
    [2, 8, 1]
];

const COLOR_LIST = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255],
    [0, 255, 255],
    [128, 0, 128],
    [0, 128, 128],
    [28, 128, 0],
    [255, 165, 0]
];

export const BRICK_LIST = function () {
    const out_list: Brick[] = [];

    SHAPE_LIST.map((shape) => {
        COLOR_LIST.map((color) => {
            out_list.push(make_brick(shape[0], shape[1], shape[2], color[0], color[1], color[2]));
        })
    })

    return out_list;
}();