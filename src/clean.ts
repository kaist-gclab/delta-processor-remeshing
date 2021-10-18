import { Model } from './types';
import { checkIfFaceCollapsed } from './util';

export function cleanModel(model: Model) {
    pruneFaces(model);
    pruneVertices(model);
}

function pruneFaces(model: Model) {
    for (let faceId = 0; faceId < model.faces.length; faceId++) {
        const face = model.faces[faceId];
        if (checkIfFaceCollapsed(face)) {
            model.faces.splice(faceId, 1);
            faceId--;
        }
    }
}

function pruneVertices(model: Model) {
    const used = new Array<number>(model.vertices.length,);
    used[0] = 0;
    for (const face of model.faces) {
        used[face.v1] = 1;
        used[face.v2] = 1;
        used[face.v3] = 1;
    }
    model.vertices = model.vertices.filter((_, index) => used[index]);
    for (let vertexId = 1; vertexId < used.length; vertexId++) {
        used[vertexId] = (used[vertexId] ?? 0) + used[vertexId - 1];
    }
    for (const face of model.faces) {
        face.v1 = used[face.v1] - 1;
        face.v2 = used[face.v2] - 1;
        face.v3 = used[face.v3] - 1;
    }
}
