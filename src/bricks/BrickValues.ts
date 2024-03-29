import { Color, make_color } from "./Color"

export interface OptionalBrickValues {
    // Render
    renderWidth?: number // Display size
    cylinderSteps?: number // Number of subdivisions for the cylinder
    cylinderHeight?: number // Height of the cylinders

    // Lego brick properties
    width?: number // number of dots
    length?: number // number of dots
    height?: number // between 0 and 1
    color?: Color // color of the brick

    number?: number
};

export interface BrickValues {
    renderWidth: number
    cylinderSteps: number
    cylinderHeight: number
    width: number
    length: number
    height: number
    color: Color

    number: number
};

export const fillDefaultValues = (from: OptionalBrickValues): BrickValues => {
    return {
        // Render
        renderWidth: from.renderWidth ?? 500,
        cylinderSteps: from.cylinderSteps ?? 20,
        cylinderHeight: from.cylinderHeight ?? 0.3,

        // Lego brick properties
        width: from.width ?? 2,
        length: from.length ?? 6,
        height: from.height ?? 1,
        color: from.color ?? make_color(0.84314, 0.03529, 0.18824, 1),

        number: from.number ?? 1
    }
}