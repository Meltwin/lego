import { BrickValues } from "../BrickValues";
import { drawScene } from "./drawing";
import { initBuffers } from "./init_buffers";
import { fsSource } from "./shader_fragment";
import { vsSource } from "./shader_vertex";

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);

    if (shader === null) return null;

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    if (shaderProgram === null || vertexShader === null || fragmentShader === null)
        return null;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert 
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram,)}`);
        return null;
    }
    return shaderProgram;
}

export function main(elem: HTMLCanvasElement | null, infos: BrickValues) {
    // Check for null element
    if (elem === null || elem === undefined) return;

    // Initialize the GL context
    const gl = elem.getContext("webgl");
    if (gl === null) return;

    // Set clear color to black, fully opaque
    // Clear the color buffer with specified clear color
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (shaderProgram === null) return;
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
            vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
            normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
        },
    };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(gl, infos);

    let squareRotation = 0.0;
    let deltaTime = 0;

    let then = 0;

    // Draw the scene repeatedly
    function render(now: number) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        if (gl === null) return;
        drawScene(gl, programInfo, buffers, squareRotation);
        squareRotation += deltaTime;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}