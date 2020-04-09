import {findReplacements, printField} from "./src/field";
import {convertToString} from "./src/word";

const field = [
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
    ['к', 'а', 'з', 'а', 'к'],
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
];

printField(field);

const replacements = findReplacements(field, ['казак'], 20);

console.dir(replacements.map(r => ({
    ...r,
    word: convertToString(r.word),
})));
