export interface CylinderPos {
    x: number[]
    y: number[]
}

export interface Vec3 {
    x: number,
    y: number,
    z: number
}

export interface Face {
    v1: number,
    v2: number,
    v3: number
}

export interface Cylinders {
    vertices: Vec3[]
    faces: Face[]
    normals: Vec3[]
}

export interface MeshOutput {
    vertices: Vec3[]
    faces: Face[]
    normals: Vec3[]
}