import {findBestAnswer, printField, solveField} from "./index";

const field = [
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
    ['к', 'а', 'з', 'а', 'к'],
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
];

// const field = [
//     ['_', 'ь', 'ш', 'я', 'ш'],
//     ['а', 'ч', 'у', 'р', 'п'],
//     ['ш', 'у', 'т', 'к', 'а'],
//     ['я', 'и', 'р', 'у', 'н'],
//     ['т', 'к', 'ф', 'к', 'с'],
// ];

printField(field);

solveField(field, [
    'казак'
], [])
// findBestAnswer(solveField(field, ['казак'], []));