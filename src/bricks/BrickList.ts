import { Color } from "./Color";

export interface Brick {
    length: number
    width: number
    height: number
    color: Color
};

export const make_brick = function (l: number, w: number, h: number, r: number, g: number, b: number): Brick {
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

export const SHAPE_LIST = [
    [2, 3, 1],
    [1, 1, 1],
    [1, 4, 1],
    [2, 4, 1],
    [1, 6, 1],
    [1, 8, 1],
    [2, 6, 1],
    [2, 8, 1]
];

export const COLOR_LIST = [
    [39, 139, 69],
    [148, 148, 148],
    [190, 6, 6],
    [217, 218, 220],
    [246, 197, 0],
    [37, 98, 178],
    [77, 77, 77],
    [102, 102, 102],
    [242, 159, 39],
    [241, 152, 200],
    [37, 62, 103],
    [108, 72, 58],
    [51, 83, 59],
    [136, 121, 98],
    [111, 39, 51],
    [92, 68, 146],
    [131, 92, 61],
    [119, 157, 132]
];

export const COLOR_NAME = [
    "Green",
    "Medium Stone",
    "Red",
    "White",
    "Yellow",
    "Blue",
    "Black",
    "Dark Stone",
    "Bright Orange",
    "Bright Pink",
    "Dark Blue",
    "Brown",
    "Dark Green",
    "Dark Tan",
    "Dark Red",
    "Dark Purple",
    "Dark Flesh",
    "Sand Green"
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