import { computeModelAverageAspectRatio, computeModelMinimumAngle, computeModelQuality } from './evaluation';
import { loadFile } from './loader';

const ObjFilePath = '';

async function main() {
    console.log('delta-processor-remeshing');
    const model = await loadFile(ObjFilePath);
    console.log(`${model.vertices.length} vertices`);
    console.log(`${model.faces.length} faces`);

    const modelQuality = computeModelQuality(model);
    const modelAverageAspectRatio = computeModelAverageAspectRatio(model);
    const modelMinimumAngle = computeModelMinimumAngle(model);
    console.log(`Quality ${modelQuality}`);
    console.log(`AverageAspectRatio ${modelAverageAspectRatio}`);
    console.log(`MinimumAngle ${modelMinimumAngle}`);
}
main();
