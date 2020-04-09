import {createField, findBestAnswer, printField, solveField} from "./src/field";

const field = createField('казак');

printField(field);

const answers = solveField(field, ['казак'], [], 1, 1);

answers.forEach(answer => {
    console.log('------------');
    printField(answer.field);

    console.log(answer.words);
    console.log('------------');
});
