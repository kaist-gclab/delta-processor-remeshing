import { computeFaceAspectRatio } from './evaluation';
import { Model } from './types';
import { getEdges, lengthSquared } from './util';

export function phaseTwo(model: Model, targetAspectRatio: number) {
    for (const face of model.faces) {
        const aspectRatio = computeFaceAspectRatio(model, face);
        if (aspectRatio >= targetAspectRatio) {
            continue;
        }

        const { p, q, r } = getEdges(model, face);
        const lengthSquaredP = lengthSquared(p);
        const lengthSquaredQ = lengthSquared(q);
        const lengthSquaredR = lengthSquared(r);

        if (lengthSquaredP < lengthSquaredQ && lengthSquaredP < lengthSquaredQ) {
            // P
        } else if (lengthSquaredQ < lengthSquaredP && lengthSquaredQ < lengthSquaredR) {
            // Q
        } else {
            // R
        }
    }
}
