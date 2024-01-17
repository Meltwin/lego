import { BrickValues } from "../BrickValues";
import { generateBox } from "./BoxGenerator";
import { generateCylinders } from "./CylinderGenerator";
import { MeshOutput } from "./Types";

const MAX_SHADER_POS = 2;

function getUnitSize(length: number, width: number) {
    return Math.min(1 / length, 1 / width);
}

export function genBrickTriangles(brick_info: BrickValues): MeshOutput {
    const unit_size = getUnitSize(brick_info.length, brick_info.width)

    // Generate the cylinders
    let cyl_points = generateCylinders(unit_size, brick_info);
    console.log(unit_size, brick_info)
    let box_points = generateBox(unit_size * brick_info.length, unit_size * brick_info.width, unit_size * brick_info.height);

    // Combining them
    let v = box_points.vertices;
    let f = box_points.faces;
    let n = box_points.normals;
    const offset = box_points.vertices.length;

    // Change face offset for the cylinders facets
    for (let i = 0; i < cyl_points.faces.length; i++) {
        cyl_points.faces[i].v1 += offset;
        cyl_points.faces[i].v2 += offset;
        cyl_points.faces[i].v3 += offset;
    }

    v = v.concat(cyl_points.vertices);
    f = f.concat(cyl_points.faces);
    n = n.concat(cyl_points.normals);

    // Grow the final model
    for (let i = 0; i < v.length; i++) {
        if (Math.abs(v[i].x) > 1 || Math.abs(v[i].y) > 1 || Math.abs(v[i].z) > 1)
            console.log(v[i]);
        v[i].x = MAX_SHADER_POS * MAX_SHADER_POS * (v[i].x - 0.5);
        v[i].y = MAX_SHADER_POS * MAX_SHADER_POS * (v[i].y - 0.5);
        v[i].z = MAX_SHADER_POS * MAX_SHADER_POS * (v[i].z + unit_size * (brick_info.height + brick_info.cylinderHeight) / 2);
    }

    return {
        vertices: v,
        faces: f,
        normals: n
    }
}
