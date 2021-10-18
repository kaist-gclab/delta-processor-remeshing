export interface Model {
    vertices: Vertex[];
    faces: Face[];
}

export interface Vertex {
    x: number;
    y: number;
    z: number;
}

export interface Face {
    v1: number;
    v2: number;
    v3: number;
}
