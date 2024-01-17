import { BrickValues } from "../BrickValues";
import { generateBox } from "./BoxGenerator";
import { generateCylinders } from "./CylinderGenerator";
import { MeshOutput } from "./Types";

const MAX_SHADER_POS = 1.75;

function getUnitSize(length: number, width: number) {
    return Math.min(1 / length, 1 / width, 0.1);
}

function combineMeshs(mesh1: MeshOutput, mesh2: MeshOutput): MeshOutput {
    // Combining them
    let v = mesh1.vertices;
    let f = mesh1.faces;
    let n = mesh1.normals;
    const offset = mesh1.vertices.length;

    // Change face offset for the cylinders facets
    for (let i = 0; i < mesh2.faces.length; i++) {
        mesh2.faces[i].v1 += offset;
        mesh2.faces[i].v2 += offset;
        mesh2.faces[i].v3 += offset;
    }

    v = v.concat(mesh2.vertices);
    f = f.concat(mesh2.faces);
    n = n.concat(mesh2.normals);

    return {
        vertices: v,
        faces: f,
        normals: n
    }
}

export function genBrickTriangles(brick_info: BrickValues): MeshOutput {
    const unit_size = getUnitSize(brick_info.length, brick_info.width)

    // Generate the cylinders
    const cyl_points = generateCylinders(unit_size, brick_info);
    const box_points = generateBox(unit_size * brick_info.length, unit_size * brick_info.width, unit_size * brick_info.height);

    let outmesh = combineMeshs(box_points, cyl_points);

    // Compute barycenter of the brick
    let min_x = 0, min_y = 0, min_z = 0;
    let max_x = 0, max_y = 0, max_z = 0;
    let mx = 0, my = 0, mz = 0;
    for (let i = 0; i < outmesh.vertices.length; i++) {
        mx += outmesh.vertices[i].x;
        my += outmesh.vertices[i].y;
        mz += outmesh.vertices[i].z;

        min_x = Math.min(min_x, outmesh.vertices[i].x);
        max_x = Math.max(max_x, outmesh.vertices[i].x);
        min_y = Math.min(min_y, outmesh.vertices[i].y);
        max_y = Math.max(max_y, outmesh.vertices[i].y);
        min_z = Math.min(min_z, outmesh.vertices[i].z);
        max_z = Math.max(max_z, outmesh.vertices[i].z);
    }
    mx /= outmesh.vertices.length;
    my /= outmesh.vertices.length;
    mz /= outmesh.vertices.length;
    mz = 0;

    let factor = 1 / MAX_SHADER_POS;

    // Grow the final model
    for (let i = 0; i < outmesh.vertices.length; i++) {
        outmesh.vertices[i].x = 2 * MAX_SHADER_POS * (outmesh.vertices[i].x - mx) / (factor);
        outmesh.vertices[i].y = 2 * MAX_SHADER_POS * (outmesh.vertices[i].y - my) / (factor);
        outmesh.vertices[i].z = 2 * MAX_SHADER_POS * (outmesh.vertices[i].z - mz) / (factor);
    }

    return outmesh
}

