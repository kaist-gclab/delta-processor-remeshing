import { Face, Model, Vertex } from './types';

export function cross(a: Vertex, b: Vertex): Vertex {
    return {
        x: a.y * b.z - a.z * b.y,
        y: -(a.x * b.z - a.z * b.x),
        z: a.x * b.y - a.y * b.x,
    };
}

export function dot(a: Vertex, b: Vertex): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function lengthSquared(a: Vertex): number {
    return dot(a, a);
}

export function length(a: Vertex): number {
    return Math.sqrt(lengthSquared(a));
}

export function getVertices(model: Model, face: Face): { a: Vertex, b: Vertex, c: Vertex } {
    const a = model.vertices[face.v1];
    const b = model.vertices[face.v2];
    const c = model.vertices[face.v3];
    return { a, b, c };
}

export function getEdges(model: Model, face: Face): { p: Vertex, q: Vertex, r: Vertex } {
    const { a, b, c } = getVertices(model, face);
    const p = vectorAToB(a, b);
    const q = vectorAToB(b, c);
    const r = vectorAToB(c, a);
    return { p, q, r };
}

export function vectorAToB(a: Vertex, b: Vertex): Vertex {
    return {
        x: b.x - a.x,
        y: b.y - a.y,
        z: b.z - a.z,
    };
}

export function checkIfFaceCollapsed(face: Face): boolean {
    return face.v1 === face.v2 || face.v2 === face.v3 || face.v1 === face.v3;
}

export function weighted(a: Vertex, b: Vertex, weightA: number): Vertex {
    const x = a.x * weightA + b.x * (1 - weightA);
    const y = a.y * weightA + b.y * (1 - weightA);
    const z = a.z * weightA + b.z * (1 - weightA);
    return { x, y, z };
}
