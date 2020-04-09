import {findAllUnCompletedWords, findReplacements, printField} from "./src/field";
import {convertToString} from "./src/word";

const field = [
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
    ['к', 'а', 'з', 'а', 'к'],
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_'],
];

printField(field);

const unCompletedWords = findAllUnCompletedWords(field);
const replacements = findReplacements(unCompletedWords, ['казак'], 20, 1);

console.dir(replacements.map(r => ({
    ...r,
    word: convertToString(r.word),
})));
