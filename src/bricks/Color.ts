export interface Color {
    red: number
    green: number
    blue: number
    alpha: number
}
export const make_color = function (r: number, g: number, b: number, a: number): Color {
    return { red: r, green: g, blue: b, alpha: a };
}

// Pre-made colors
export const defColor = make_color(1, 0, 0, 1);