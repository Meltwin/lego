const NORMAL_MU = 8;
const NORMAL_STD = 1;

function normalValue(x: number) {
    return Math.exp(-(x - NORMAL_MU) * (x - NORMAL_MU) / (NORMAL_STD * NORMAL_STD));
}

const sorting_func = (a: number[], b: number[]) => {
    return normalValue(b[0] + b[1]) - normalValue(a[0] + a[1]);
}

const PLATE_HEIGHT = 0.4;
export const PLANE_LIST = (() => {
    let a = [
        // Ordering them from the most frequent to the lest frequent
        [1, 1, PLATE_HEIGHT],
        [1, 2, PLATE_HEIGHT],
        [1, 3, PLATE_HEIGHT],
        [1, 6, PLATE_HEIGHT],
        [1, 8, PLATE_HEIGHT],
        [2, 2, PLATE_HEIGHT],
        [2, 3, PLATE_HEIGHT],
        [2, 4, PLATE_HEIGHT],
        [2, 6, PLATE_HEIGHT],
        [2, 8, PLATE_HEIGHT],
        [4, 4, PLATE_HEIGHT],
        [4, 6, PLATE_HEIGHT],
        [6, 6, PLATE_HEIGHT],
        [6, 8, PLATE_HEIGHT],
        [6, 10, PLATE_HEIGHT],
        [6, 12, PLATE_HEIGHT],
        [6, 14, PLATE_HEIGHT],
        [6, 16, PLATE_HEIGHT],
        [1, 10, PLATE_HEIGHT],
        [1, 12, PLATE_HEIGHT],
        [1, 14, PLATE_HEIGHT],
        [1, 16, PLATE_HEIGHT],
        [2, 10, PLATE_HEIGHT],
        [2, 12, PLATE_HEIGHT],
        [2, 14, PLATE_HEIGHT],
        [2, 16, PLATE_HEIGHT],
        [4, 8, PLATE_HEIGHT],
        [4, 10, PLATE_HEIGHT],
        [4, 12, PLATE_HEIGHT],
        [4, 14, PLATE_HEIGHT],
        [4, 16, PLATE_HEIGHT],
        [8, 8, PLATE_HEIGHT],
        [8, 10, PLATE_HEIGHT],
        [8, 12, PLATE_HEIGHT],
        [8, 14, PLATE_HEIGHT],
        [8, 16, PLATE_HEIGHT],
    ]
    a.sort(sorting_func)
    return a;
})();

const BRICK_HEIGHT = 1;
export const SHAPE_LIST = (() => {
    let a = [
        // 1 width
        [1, 1, BRICK_HEIGHT],
        [1, 2, BRICK_HEIGHT],
        [1, 3, BRICK_HEIGHT],
        [1, 6, BRICK_HEIGHT],
        [1, 8, BRICK_HEIGHT],
        [2, 2, BRICK_HEIGHT],
        [2, 3, BRICK_HEIGHT],
        [2, 4, BRICK_HEIGHT],
        [2, 6, BRICK_HEIGHT],
        [4, 6, BRICK_HEIGHT],
        // [2, 8, BRICK_HEIGHT],
        // [2, 10, BRICK_HEIGHT],
        // [1, 10, BRICK_HEIGHT],
        // [4, 10, BRICK_HEIGHT],
        // [4, 12, BRICK_HEIGHT],
        // [1, 12, BRICK_HEIGHT],
        // [1, 16, BRICK_HEIGHT],
        // [8, 8, BRICK_HEIGHT],
        // [8, 16, BRICK_HEIGHT],
    ]
    a.sort(sorting_func)
    return a;
})();

console.log(PLANE_LIST)
console.log(SHAPE_LIST)

export const COLOR_LIST = [
    [39, 139, 69],
    [148, 148, 148],
    [190, 6, 6],
    [217, 218, 220],
    [246, 197, 0],
    [37, 98, 178],
    [77, 77, 77],
    //[102, 102, 102],
    [242, 159, 39],
    [241, 152, 200],
    [37, 62, 103],
    [108, 72, 58],
    [51, 83, 59],
    //[136, 121, 98],
    [111, 39, 51],
    [92, 68, 146],
    //[131, 92, 61],
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
    //"Dark Stone",
    "Bright Orange",
    "Bright Pink",
    "Dark Blue",
    "Brown",
    "Dark Green",
    //"Dark Tan",
    "Dark Red",
    "Dark Purple",
    //"Dark Flesh",
    "Sand Green"
];