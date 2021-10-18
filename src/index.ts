import { cleanModel } from './clean';
import { computeModelAverageAspectRatio, computeModelMinimumAngle, computeModelQuality } from './evaluation';
import { loadFile } from './load';
import { phaseOne } from './remeshingPhaseOne';
import { saveFile } from './save';

const InputObjFilePath = '';
const OutputObjFilePath = 'output.obj';

async function main() {
    console.log('delta-processor-remeshing');
    const model = await loadFile(InputObjFilePath);

    const evaluate = () => {
        console.log(`${model.vertices.length} vertices`);
        console.log(`${model.faces.length} faces`);
        const modelQuality = computeModelQuality(model);
        const modelAverageAspectRatio = computeModelAverageAspectRatio(model);
        const modelMinimumAngle = computeModelMinimumAngle(model);
        console.log(`Quality ${modelQuality}`);
        console.log(`AverageAspectRatio ${modelAverageAspectRatio}`);
        console.log(`MinimumAngle ${modelMinimumAngle}`);
    };

    console.log('input');
    evaluate();

    console.log('phaseOne');
    phaseOne(model, 25);
    cleanModel(model);
    evaluate();
    await saveFile(OutputObjFilePath, model);
}
main();
