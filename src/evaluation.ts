import { Face, Model, Vertex } from './types';
import { cross, getEdges, getVertices, length, vectorAToB } from './util';

const Eps = 1e-10;

export function computeModelQuality(model: Model): number {
    let minimumQuality = Number.MAX_VALUE;
    for (const face of model.faces) {
        minimumQuality = Math.min(minimumQuality, computeFaceQuality(model, face));
    }
    return minimumQuality;
}

const QualityConstantFactor = 6 / Math.sqrt(3);
function computeFaceQuality(model: Model, face: Face): number {
    const { p, q, r } = getEdges(model, face);
    const lengthP = length(p);
    const lengthQ = length(q);
    const lengthR = length(r);
    const area = length(cross(p, q)) * 0.5;
    const halfPerimeter = (lengthP + lengthQ + lengthR) * 0.5;
    const longestEdge = Math.max(lengthP, lengthQ, lengthR);
    const quality = QualityConstantFactor * area / (halfPerimeter * longestEdge);
    return quality;
}

export function computeModelAverageAspectRatio(model: Model): number {
    let totalAspectRatio = 0;
    for (const face of model.faces) {
        totalAspectRatio += computeFaceAspectRatio(model, face);
    }
    totalAspectRatio /= model.faces.length;
    return totalAspectRatio;
}

const AspectRatioConstantFactor = 1 / 8;
function computeFaceAspectRatio(model: Model, face: Face): number {
    const { p, q, r } = getEdges(model, face);
    const lengthP = length(p);
    const lengthQ = length(q);
    const lengthR = length(r);
    const s = (lengthP + lengthQ + lengthR) * 0.5;
    const ar = (lengthP * lengthQ * lengthR) * AspectRatioConstantFactor /
        ((s - lengthP) * (s - lengthQ) * (s - lengthR));
    return ar;
}

export function computeModelMinimumAngle(model: Model): number {
    let minimumAngle = Number.MAX_VALUE;
    for (const face of model.faces) {
        minimumAngle = Math.min(minimumAngle, computeFaceMinimumAngle(model, face));
    }
    return minimumAngle;
}


function computeFaceMinimumAngle(model: Model, face: Face): number {
    const { a, b, c } = getVertices(model, face);
    return Math.min(
        getAngleDeg(a, b, c),
        getAngleDeg(b, c, a),
        getAngleDeg(c, a, b),
    );
}

function clamp(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

function getAngleDeg(prev: Vertex, current: Vertex, next: Vertex): number {
    const left = vectorAToB(current, prev);
    const right = vectorAToB(current, next);
    const abSinTheta = length(cross(left, right));
    const sinTheta = abSinTheta / length(left) / length(right);
    const safeSinTheta = clamp(sinTheta, -1, 1);
    if (Math.abs(safeSinTheta - sinTheta) > Eps) {
        console.error('getAngleDeg');
        console.error(sinTheta);
    }
    const thetaRad = Math.asin(safeSinTheta);
    const thetaDeg = thetaRad * 180 / Math.PI;
    return thetaDeg;
}
