import { getAngleDeg } from './evaluation';
import { Model } from './types';
import { checkIfFaceCollapsed, getVertices } from './util';

const PhaseOneSteps = 8;

export function phaseOne(model: Model, minimumAngleDeg: number) {
    for (let step = 1; step <= PhaseOneSteps; step++) {
        for (; ;) {
            const currentStepAngleDeg = minimumAngleDeg * step / PhaseOneSteps;
            const updated = collapseLessThanMininumAngle(model, currentStepAngleDeg);
            if (!updated) {
                break;
            }
        }
    }
}

function collapseLessThanMininumAngle(model: Model, minimumAngleDeg: number): boolean {
    let updated: boolean = false;

    for (let faceId = 0; faceId < model.faces.length; faceId++) {
        const face = model.faces[faceId];

        const removeFaceInPlace = (id: number) => {
            updated = true;
            model.faces.splice(id, 1);
            if (faceId >= id) {
                faceId--;
            }
        };

        if (checkIfFaceCollapsed(face)) {
            removeFaceInPlace(faceId);
            continue;
        }

        const { a, b, c } = getVertices(model, face);
        const angleA = getAngleDeg(c, a, b);
        const angleB = getAngleDeg(a, b, c);
        const angleC = getAngleDeg(b, c, a);
        if (Math.min(angleA, angleB, angleC) >= minimumAngleDeg) {
            continue;
        }

        if (angleA < angleB && angleA < angleC) {
            collapseEdge(model, face.v2, face.v3);
        } else if (angleB < angleA && angleB < angleC) {
            collapseEdge(model, face.v1, face.v3);
        } else {
            collapseEdge(model, face.v1, face.v2);
        }

        removeFaceInPlace(faceId);
    }

    return updated;
}

function collapseEdge(model: Model, a: number, b: number) {
    model.vertices[b] = weighted(model.vertices[a], model.vertices[b], 0.5);

    for (const face of model.faces) {
        face.v1 = changeIf(face.v1, a, b);
        face.v2 = changeIf(face.v2, a, b);
        face.v3 = changeIf(face.v3, a, b);
    }
}

function changeIf<T>(orig: T, filter: T, changeTo: T): T {
    if (orig === filter) {
        return changeTo;
    }
    return orig;
}
