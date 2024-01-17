import { BrickValues } from "../BrickValues";
import { generateBox } from "./BoxGenerator";
import { generateCylinders } from "./CylinderGenerator";
import { MeshOutput } from "./Types";

const MAX_SHADER_POS = 2.5;

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

    // Compute barycenter of the brick
    let min_x = 0, min_y = 0, min_z = 0;
    let max_x = 0, max_y = 0, max_z = 0;
    let mx = 0, my = 0, mz = 0;
    for (let i = 0; i < v.length; i++) {
        mx += v[i].x;
        my += v[i].y;
        mz += v[i].z;

        min_x = Math.min(min_x, v[i].x);
        max_x = Math.max(max_x, v[i].x);
        min_y = Math.min(min_y, v[i].y);
        max_y = Math.max(max_y, v[i].y);
        min_z = Math.min(min_z, v[i].z);
        max_z = Math.max(max_z, v[i].z);
    }
    mx /= v.length;
    my /= v.length;
    mz /= v.length;

    let factor = Math.max(max_x - min_x, max_y - min_y, max_z - min_z);

    // Grow the final model
    for (let i = 0; i < v.length; i++) {
        v[i].x = 2 * MAX_SHADER_POS * (v[i].x - mx) / (factor);
        v[i].y = 2 * MAX_SHADER_POS * (v[i].y - my) / (factor);
        v[i].z = 2 * MAX_SHADER_POS * (v[i].z - mz) / (factor);
    }

    return {
        vertices: v,
        faces: f,
        normals: n
    }
}

