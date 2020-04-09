import {createField, findBestAnswer, printField, solveField} from "./src/field";

const field = createField('шутка');

printField(field);

const answers = solveField(field, ['шутка'], [], 2, 1);

answers.forEach(answer => {
    console.log('------------');
    printField(answer.field);

    console.log(answer.words);
    console.log('------------');
});
