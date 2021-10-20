import { cleanModel } from './clean';
import { printEvaluation } from './evaluation';
import { loadFile } from './load';
import { phaseOne } from './remeshingPhaseOne';
import { phaseTwo } from './remeshingPhaseTwo';
import { saveFile } from './save';

const Dataset: { inputPath: string; outputPath: string; }[] = [
    {
        inputPath: './input/fandisk.obj',
        outputPath: './output/fandisk.obj',
    },
    {
        inputPath: './input/cheburashka.obj',
        outputPath: './output/cheburashka.obj',
    },
    {
        inputPath: './input/homer.obj',
        outputPath: './output/homer.obj',
    },
    {
        inputPath: './input/rocker-arm.obj',
        outputPath: './output/rocker-arm.obj',
    },
    {
        inputPath: './input/teapot.obj',
        outputPath: './output/teapot.obj',
    },
    {
        inputPath: './input/smpl_uv.obj',
        outputPath: './output/smpl_uv.obj',
    },
];

async function main() {
    console.log('delta-processor-remeshing');

    for (const data of Dataset) {
        console.log(data.inputPath);
        console.log(data.outputPath);
        const model = await loadFile(data.inputPath);

        console.log('input');
        printEvaluation(model);

        console.log('phaseOne');
        phaseOne(model, 25);
        cleanModel(model);
        printEvaluation(model);

        console.log('phaseTwo');
        phaseTwo(model, 1.5);
        cleanModel(model);
        printEvaluation(model);

        await saveFile(data.outputPath, model);
        console.log();
    }
}
main();
