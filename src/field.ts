import {createLetter, isEmptyCharacter, isEmptyLetter, Letter} from "./letter";
import {compareWords, Word} from "./word";
import {findVariants} from "./dictionary";

export type Field = string[][];

interface Answer {
    field: Field,
    words: string[],
}

export function getLetter(field: Field, i: number, j: number): Letter {
    return createLetter(field[i][j], i, j);
}

export function findEmptyLetters(field: Field): Letter[] {
    const result: Letter[] = [];

    field.forEach((row, i) => {
        row.forEach((character, j) => {
            if (isEmptyCharacter(character)) {
                result.push(createLetter(character, i, j));
            }
        });
    });

    return result;
}

export function getNeighbours(field: Field, letter: Letter) {
    const neighbours = [];

    if (letter.i > 0) {
        neighbours.push(getLetter(field, letter.i - 1, letter.j));
    }

    if (letter.j < field[letter.i].length - 1) {
        neighbours.push(getLetter(field, letter.i, letter.j + 1));
    }

    if (letter.i < field.length - 1) {
        neighbours.push(getLetter(field, letter.i + 1, letter.j));
    }

    if (letter.j > 0) {
        neighbours.push(getLetter(field, letter.i, letter.j - 1));
    }

    return neighbours;
}

export function filterEmptyOrUsed(letters: Letter[], word: Word) {
    return letters.filter(letter => {
        return !isEmptyLetter(letter) && !word.some(symbl => symbl.i === letter.i && symbl.j === letter.j);
    });
}

export function findWords(field: Field, word: Word): Word[] {
    const letter = word[word.length - 1];
    const neighbours = filterEmptyOrUsed(getNeighbours(field, letter), word);

    let words: Word[] = [];

    if (word.length > 1) {
        words.push(word);
    }

    return neighbours.reduce((wrds, neighbour) => {
        const newWord = word.concat(neighbour);
        const newWords = findWords(field, newWord);

        return wrds.concat(newWords);
    }, words);
}

export function findUnCompletedWords(field: Field) {
    const letters = findEmptyLetters(field);

    return letters.reduce((unCompletedWords, letter) => {
        const word = [letter];
        const words = findWords(field, word);

        if (words.length > 1) {
            return unCompletedWords.concat(words);
        }

        return unCompletedWords;
    }, [] as Word[]);
}

export function findAllUnCompletedWords(field: Field) {
    const words: Word[] = findUnCompletedWords(field).filter(word => word.length < 25);
    const reversedWords: Word[] = words.map(word => word.slice().reverse());

    return words.concat(reversedWords);
}

export function cloneField(field: Field): Field {
    return field.map((row: string[]) => row.slice());
}

export function compareFields(f1: Field, f2: Field): boolean {
    return f1.map(row => row.join()).join() === f2.map(row => row.join()).join()
}

const fields: Answer[] = [];

export function isExistingCase(field: string[][], words: string[]) {
    return fields.some(existing => {
        return compareFields(field, existing.field) && compareWords(words, existing.words);
    });
}

export function findReplacements(unCompletedWords: Word[], words: string[], depth = 2, vdepth = 2) {
    const replacements = unCompletedWords
        .map(word => ({
            word,
            variants: findVariants(word).filter(variant => !words.includes(variant)).slice(0, vdepth),
        }))
        .filter(replacement => replacement.variants.length);

    replacements.sort((a, b) => b.word.length - a.word.length);

    return replacements.slice(0, depth);
}

export function solveField(field: Field, words: string[] = [], answers: Answer[], depth = 2, count = 2): Answer[] {
    if (answers.length >= count) {
        return answers;
    }

    const unCompletedWords = findAllUnCompletedWords(field);

    if (!unCompletedWords.length) {
        answers.push({
            field,
            words,
        })
    }

    const replacements = findReplacements(unCompletedWords, words, depth, depth);

    replacements.forEach(replacement => {
        replacement.variants.forEach(variant => {
            const fld = fillWord(field, replacement.word, variant);

            solveField(fld, words.concat([variant]), answers, depth, count);
        });
    });

    return answers;
}

export function findBestAnswer(answers: Answer[]): Answer {
    return answers.slice().sort((a, b) => b.words.reduce((s, w) => s + w.length, 0) - a.words.reduce((s, w) => s + w.length, 0))[0];
}

export function generateField(a: number = 5): Field {
    const field: Field = [];

    for (let i = 0; i < a; i++) {
        field.push([]);

        for (let j = 0; j < a; j++) {
            field[i].push('_')
        }
    }

    return field;
}

export function printField(field: Field) {
    let str = '';

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            str += field[i][j] + ' ';
        }

        str += '\n';
    }

    console.log(str);
}

export function fillWord(field: Field, word: Word, str: string): Field {
    const fld = cloneField(field);

    if (word[0].s === '_') {
        fld[word[0].i][word[0].j] = str.charAt(0);
    } else if (word[word.length - 1].s === '_') {
        fld[word[word.length - 1].i][word[word.length - 1].j] = str.charAt(word.length - 1);
    }

    return fld;
}

export function writeWord(field: Field, word: Word) {
    const fld = cloneField(field);

    word.forEach(letter => {
        fld[letter.i][letter.j] = letter.s
    });

    return fld;
}

export function createField(str = ''): Field {
    const field = generateField(str.length);
    const word: Word = str.split('')
        .map((character, j) => createLetter(character, Math.floor(str.length / 2), j));

    return writeWord(field, word);
}
