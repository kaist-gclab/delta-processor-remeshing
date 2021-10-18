import { readFile } from 'fs/promises';
import { Face, Model, Vertex } from './types';

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
        } else if (lineType === 'f' && tokens.length === 4) {
            faces.push({
                v1: Number(tokens[1]) - 1,
                v2: Number(tokens[2]) - 1,
                v3: Number(tokens[3]) - 1,
            });
        } else {
            console.error(line);
            process.exit(-1);
        }
    }
    return { vertices, faces };
}
