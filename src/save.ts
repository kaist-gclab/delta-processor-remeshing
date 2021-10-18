import { Model } from './types';
import { writeFile } from 'fs/promises';

export async function saveFile(filePath: string, model: Model): Promise<void> {
    const { vertices, faces } = model;
    const lines: string[] = [];
    const write = (line: string) => {
        lines.push(line);
    };

    for (const vertex of vertices) {
        write(`v ${vertex.x} ${vertex.y} ${vertex.z}`);
    }
    for (const face of faces) {
        write(`f ${face.v1 + 1} ${face.v2 + 1} ${face.v3 + 1}`);
    }

    const content = lines.join('\n');
    await writeFile(filePath, content, 'utf8');
}
