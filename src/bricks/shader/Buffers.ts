export interface Buffers {
    position: WebGLBuffer | null
    color: WebGLBuffer | null
    indices: WebGLBuffer | null
    normal: WebGLBuffer | null
    n_vertex: number
}