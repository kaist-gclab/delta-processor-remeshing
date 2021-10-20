import { readFile } from 'fs/promises';
import { Face, Model, Vertex } from './types';

const NotImplemented = ['vt', 'g', 'mtllib', '#', 'usemtl'];

export async function loadFile(filePath: string): Promise<Model> {
    const vertices: Vertex[] = [];
    const faces: Face[] = [];

    const content = await readFile(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.length > 0).map(line => line.trim());
    for (const line of lines) {
        const tokens = line.split(' ').filter(token => token.length > 0);
        if (tokens.length <= 0) {
            continue;
        }
        const lineType = tokens[0];
        if (lineType === 'v' && tokens.length === 4) {
            vertices.push({
                x: Number(tokens[1]),
                y: Number(tokens[2]),
                z: Number(tokens[3]),
            });
        } else if (lineType === 'f') {
            const first = parseFaceIndices(tokens[1]);
            for (let vertexId = 3; vertexId < tokens.length; vertexId++) {
                faces.push({
                    v1: first - 1,
                    v2: parseFaceIndices(tokens[vertexId - 1]) - 1,
                    v3: parseFaceIndices(tokens[vertexId]) - 1,
                });
            }
        } else if (NotImplemented.includes(lineType)) {
            continue;
        } else {
            console.error(line);
            process.exit(-1);
        }
    }
    return { vertices, faces };
}

function parseFaceIndices(indices: string): number {
    if (indices.includes('/')) {
        return parseFaceIndices(indices.split('/')[0]);
    }
    return Number(indices);
}
