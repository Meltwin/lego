import { BrickValues } from "../BrickValues";
import { genBrickTriangles } from "../generator/BrickTrianglesGen";
import { MeshOutput } from "../generator/Types";
import { Buffers } from "./Buffers";

function initPositionBuffer(gl: WebGLRenderingContext, mesh: MeshOutput): WebGLBuffer | null {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.
    let positions: number[] = [];
    for (let i = 0; i < mesh.vertices.length; i++)
        positions.push(mesh.vertices[i].x, mesh.vertices[i].y, mesh.vertices[i].z);

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext, n: number, infos: BrickValues): WebGLBuffer | null {
    // Fill the color buffer
    let colors: number[] = [];
    const converted_color = [infos.color.red, infos.color.green, infos.color.blue, infos.color.alpha];
    for (let i = 0; i < n; i++)
        colors = colors.concat(converted_color);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

function initIndexBuffer(gl: WebGLRenderingContext, mesh: MeshOutput, infos: BrickValues) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    let indices: number[] = [];
    for (let i = 0; i < mesh.faces.length; i++)
        indices = indices.concat(mesh.faces[i].v1, mesh.faces[i].v2, mesh.faces[i].v3);

    // Now send the element array to GL
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
    );

    return indexBuffer;
}

function initNormalBuffer(gl: WebGLRenderingContext, mesh: MeshOutput,) {
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    let normals: number[] = [];
    for (let i = 0; i < mesh.normals.length; i++)
        normals = normals.concat(mesh.normals[i].x, mesh.normals[i].y, mesh.normals[i].z);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW,
    );

    return normalBuffer;
}




export function initBuffers(gl: WebGLRenderingContext, infos: BrickValues): Buffers {
    const mesh = genBrickTriangles(infos);
    const positionBuffer = initPositionBuffer(gl, mesh);
    const colorBuffer = initColorBuffer(gl, mesh.vertices.length, infos);
    const indexBuffer = initIndexBuffer(gl, mesh, infos);
    const normalBuffer = initNormalBuffer(gl, mesh);

    return {
        position: positionBuffer,
        normal: normalBuffer,
        color: colorBuffer,
        indices: indexBuffer,
        n_vertex: 3 * mesh.faces.length
    };
}