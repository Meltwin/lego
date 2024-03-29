// Tell WebGL how to pull out the positions from the position

import { mat4 } from "gl-matrix";
import { Buffers } from "./Buffers";
import { ProgramInfo } from "./ProgramInfo";

// buffer into the vertexPosition attribute.
function setPositionAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    const numComponents = 3; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

// Tell WebGL how to pull out the normals from
// the normal buffer into the vertexNormal attribute.
function setNormalAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
}



export function drawScene(gl: WebGLRenderingContext, programInfo: ProgramInfo, buffers: Buffers, rotation: number) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    if (gl.canvas instanceof OffscreenCanvas) return;

    const fieldOfView = (30 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 10;
    const zFar = 80.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -16.0],
    ); // amount to translate

    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        -60 * Math.PI / 180, // amount to rotate in radians
        [1, 0, 0],
    );

    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        20 * Math.PI / 180, // amount to rotate in radians
        [0, 0, 1],
    );


    // mat4.rotate(
    //     modelViewMatrix, // destination matrix
    //     modelViewMatrix, // matrix to rotate
    //     Math.PI / 4, // amount to rotate in radians
    //     [0, 1, 1],
    // ); // axis to rotate around

    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        rotation, // amount to rotate in radians
        [0, 0, 1],
    ); // axis to rotate around (Z)
    // mat4.rotate(
    //     modelViewMatrix, // destination matrix
    //     modelViewMatrix, // matrix to rotate
    //     rotation * 0.7, // amount to rotate in radians
    //     [0, 1, 0],
    // ); // axis to rotate around (Y)
    // mat4.rotate(
    //     modelViewMatrix, // destination matrix
    //     modelViewMatrix, // matrix to rotate
    //     rotation * 0.3, // amount to rotate in radians
    //     [1, 0, 0],
    // ); // axis to rotate around (X)

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);




    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffers, programInfo);
    setColorAttribute(gl, buffers, programInfo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    setNormalAttribute(gl, buffers, programInfo);


    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix,
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix,
    );


    {
        const vertexCount = buffers.n_vertex;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

}
