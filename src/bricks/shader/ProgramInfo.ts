export interface ProgramInfo {
    program: WebGLProgram
    attribLocations: {
        vertexPosition: number,
        vertexColor: number,
        vertexNormal: number
    }
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation | null
        modelViewMatrix: WebGLUniformLocation | null
        normalMatrix: WebGLUniformLocation | null
    }
}