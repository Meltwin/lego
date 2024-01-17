import { MeshOutput } from "./Types";

export function generateBox(length: number, width: number, height: number): MeshOutput {
    return {
        vertices: [
            // Front face
            { x: 0, y: 0, z: height },
            { x: length, y: 0, z: height },
            { x: length, y: width, z: height },
            { x: 0, y: width, z: height },

            // Back face
            { x: 0, y: 0, z: 0 },
            { x: 0, y: width, z: 0 },
            { x: length, y: width, z: 0 },
            { x: length, y: 0, z: 0 },

            // Top face
            { x: 0, y: width, z: 0 },
            { x: 0, y: width, z: height },
            { x: length, y: width, z: height },
            { x: length, y: width, z: 0 },

            // Bottom face
            { x: 0, y: 0, z: 0 },
            { x: length, y: 0, z: 0 },
            { x: length, y: 0, z: height },
            { x: 0, y: 0, z: height },

            // Right face
            { x: length, y: 0, z: 0 },
            { x: length, y: width, z: 0 },
            { x: length, y: width, z: height },
            { x: length, y: 0, z: height },

            // Left face
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 0, z: height },
            { x: 0, y: width, z: height },
            { x: 0, y: width, z: 0 },
        ],
        faces: [
            // Front
            { v1: 0, v2: 1, v3: 2 },
            { v1: 0, v2: 2, v3: 3 },

            // Back
            { v1: 4, v2: 5, v3: 6 },
            { v1: 4, v2: 6, v3: 7 },

            // Top
            { v1: 8, v2: 9, v3: 10 },
            { v1: 8, v2: 10, v3: 11 },

            // Bottom
            { v1: 12, v2: 13, v3: 14 },
            { v1: 12, v2: 14, v3: 15 },

            // Right
            { v1: 16, v2: 17, v3: 18 },
            { v1: 16, v2: 18, v3: 19 },

            // Left
            { v1: 20, v2: 21, v3: 22 },
            { v1: 20, v2: 22, v3: 23 },
        ],
        normals: [
            // Front face
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },

            // Back face
            { x: 0, y: 0, z: -1 },
            { x: 0, y: 0, z: -1 },
            { x: 0, y: 0, z: -1 },
            { x: 0, y: 0, z: -1 },

            // Top face
            { x: 0, y: 1, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 0, y: 1, z: 0 },

            // Bottom face
            { x: 0, y: -1, z: 0 },
            { x: 0, y: -1, z: 0 },
            { x: 0, y: -1, z: 0 },
            { x: 0, y: -1, z: 0 },

            // Right face
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },

            // Left face
            { x: -1, y: 0, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: -1, y: 0, z: 0 },
        ]
    }
}