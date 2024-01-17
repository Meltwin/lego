import { BrickValues } from "../BrickValues";
import { CylinderPos, Cylinders, Face, Vec3 } from "./Types";

/**
 * Generate the position of the cylinders
 * @param unit_size 
 * @param length 
 * @param width 
 * @returns 
 */
export function getCylinderPositions(unit_size: number, length: number, width: number): CylinderPos {
    let pos_x = [], pos_y = [];

    for (let row = 0; row < length; row++) {
        for (let col = 0; col < width; col++) {
            pos_x.push(unit_size * (row + 0.5));
            pos_y.push(unit_size * (col + 0.5));
        }
    }

    return {
        x: pos_x,
        y: pos_y
    }
}

function make_cylinder(cx: number, cy: number, h: number, hc: number, r: number, infos: BrickValues): Cylinders {
    let v: Vec3[] = [];
    let f: Face[] = [];
    let n: Vec3[] = [];

    const z_top = h + hc;
    const z_btm = h;
    const dtheta = 2 * Math.PI / infos.cylinderSteps;

    // Adding the cap center point as first point
    v.push({ x: cx, y: cy, z: z_top });
    n.push({ x: 0, y: 0, z: 1 });
    v.push({ x: cx + r, y: cy, z: z_top });
    n.push({ x: 1, y: 0, z: 0 });
    v.push({ x: cx + r, y: cy, z: z_btm });
    n.push({ x: 1, y: 0, z: 0 });
    let v1 = v.length - 1, v2 = v.length - 2;

    // Iterating for making the whole cylinder
    for (let i = 1; i <= infos.cylinderSteps + 1; i++) {
        for (let btmUp = 0; btmUp < 2; btmUp++) {
            // Generating bottom point for next triangle
            let v3 = {
                x: cx + r * Math.cos(i * dtheta),
                y: cy + r * Math.sin(i * dtheta),
                z: (btmUp === 0) ? z_btm : z_top
            };
            v.push(v3);
            n.push({ x: Math.cos(dtheta), y: Math.sin(dtheta), z: 0 });

            // Create new faces
            f.push({ v1: v1, v2: v2, v3: v.length - 1 }); // New triangle
            if (btmUp === 1) {
                f.push({ v1: 0, v2: v1, v3: v.length - 1 }); // Top triangle
            }

            // Swap vertices indices
            v1 = v2;
            v2 = v.length - 1;
        }
    }

    return {
        vertices: v,
        faces: f,
        normals: n
    }
}

export function generateCylinders(unit_size: number, infos: BrickValues): Cylinders {
    const cyl_pos = getCylinderPositions(unit_size, infos.length, infos.width);
    let v: Vec3[] = [];
    let f: Face[] = [];
    let n: Vec3[] = [];
    let offset = 0;

    for (let i = 0; i < cyl_pos.x.length; i++) {
        let result = make_cylinder(cyl_pos.x[i], cyl_pos.y[i], unit_size * infos.height, unit_size * infos.cylinderHeight, 0.35 * unit_size, infos);
        offset = v.length;
        v = v.concat(result.vertices)
        for (let fi = 0; fi < result.faces.length; fi++) {
            result.faces[fi].v1 += offset;
            result.faces[fi].v2 += offset;
            result.faces[fi].v3 += offset;
        }
        f = f.concat(result.faces);
        n = n.concat(result.normals);
    }

    return {
        vertices: v,
        faces: f,
        normals: n
    };
}