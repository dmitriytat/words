import wordsDictionary from './singularbylength.json';

interface Symbl {
    s: string,
    i: number,
    j: number,
}

type Word = Symbl[];

type Words = Word[];

type Field = string[][];

export function findEmpty(field: Field): Words {
    const result = [];

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === '_') {
                result.push([
                    {s: field[i][j], i, j},
                ])
            }
        }
    }

    return result;
}

export function getSymbol(field: Field, i: number, j: number): Symbl {
    return {s: field[i][j], i: i, j: j}
}

export function getNeighbours(field: Field, symbol: Symbl) {
    const neighbours = [];

    if (symbol.i > 0) {
        neighbours.push(getSymbol(field, symbol.i - 1, symbol.j));
    }

    if (symbol.j < field[symbol.i].length - 1) {
        neighbours.push(getSymbol(field, symbol.i, symbol.j + 1));
    }

    if (symbol.i < field.length - 1) {
        neighbours.push(getSymbol(field, symbol.i + 1, symbol.j));
    }

    if (symbol.j > 0) {
        neighbours.push(getSymbol(field, symbol.i, symbol.j - 1));
    }

    return neighbours;
}

export function filterEmpty(symbols: Symbl[]) {
    return symbols.filter(symbol => symbol.s !== '_');
}

export function filterUsed(symbols: Symbl[], word: Word) {
    return symbols.filter(symbol => !word.some(symbl => symbl.i === symbol.i && symbl.j === symbol.j));
}

export function findWords(field: Field, word: Word) {
    const symbol = word[word.length - 1];
    const neighbours = filterUsed(filterEmpty(getNeighbours(field, symbol)), word);

    let words: Words = [];

    if (word.length > 1) {
        words.push(word);
    }

    neighbours.forEach(smbl => {
        const newWord = word.concat(smbl);
        const newWords = findWords(field, newWord);

        words = words.concat(newWords);
    });

    return words;
}

export function findUnCompletedWords(field: Field) {
    let words: Words = [];
    const empty = findEmpty(field);

    empty.forEach(word => {
        const wrds = findWords(field, word);

        if (wrds.length > 1) {
            words = words.concat(wrds);
        }
    });

    return words;
}

export function invertWords(words: Words) {
    return words.map(word => word.slice().reverse());
}

export function findAllUnCompletedWords(field: Field) {
    const words: Words = findUnCompletedWords(field);

    return words.concat(invertWords(words));
}

export function getWord(word: Word): string {
    return word.reduce((str, symbol) => (str + symbol.s), '');
}

const memo: { [key: string]: string[] } = {};

export function memoizedVariants(str: string): string[] {
    if (!memo[str]) {
        const variants: string[] = [];
        const regExp = new RegExp('^' + str.replace('_', '.') + '$');

        // @ts-ignore
        if (wordsDictionary[str.length]) {
            // @ts-ignore
            wordsDictionary[str.length].forEach((wrd: string) => {
                if (regExp.test(wrd)) {
                    variants.push(wrd);
                }
            });
        }

        memo[str] = variants;
    }

    return memo[str];
}

export function findVariants(word: Word): string[] {
    const str = getWord(word);

    return memoizedVariants(str);
}

export function cloneField(field: Field): Field {
    return field.map((row: string[]) => row.slice());
}

export function writeWord(field: Field, word: Word, replacement: string): Field {
    const fld = cloneField(field);

    if (word[0].s === '_') {
        fld[word[0].i][word[0].j] = replacement.charAt(0);
    } else if (word[word.length - 1].s === '_') {
        fld[word[word.length - 1].i][word[word.length - 1].j] = replacement.charAt(word.length - 1);
    }

    return fld;
}

interface Answer {
    field: Field,
    words: string[],
}

export function compareFields(f1: Field, f2: Field): boolean {
    return f1.map(row => row.join()).join() === f2.map(row => row.join()).join()
}

export function compareWords(w1: string[], w2: string[]): boolean {
    return w1.every(word => w2.includes(word));
}

interface Lol {
 field: Field;
 words: string[];
}
const lol: Lol[] = [];

let counter = 0;

export function solveField(field: Field, words: string[] = [], answers: Answer[]): Answer[] {
    // if (counter < words.length) {
    //     counter = words.length;
    //     console.log({counter});
    // }
    //
    if (answers.length > 1) {
        answers.push({
            field,
            words
        });

        return answers;
    }

    if (lol.some(l => {
        return compareFields(field, l.field) && compareWords(words, l.words);
    })) {
        // console.log('double')
        return answers;
    }

    lol.push({
        field,
        words
    })

    const unCompletedWords = findAllUnCompletedWords(field);

    if (!unCompletedWords.length) {
        answers.push({
            field,
            words
        });

        process.stdout.write(JSON.stringify({
            c: 1,
            answers: answers.length
        }) + '\r');

        return answers;
    }

    const replacements = unCompletedWords
        .map(word => ({
            word,
            variants: findVariants(word).filter(variant => !words.includes(variant)),
        }))
        .filter(replacement => replacement.variants.length);

    if (!replacements.length) {
        answers.push({
            field,
            words
        });

        process.stdout.write(JSON.stringify({
            c: 2,
            answers: answers.length
        }) + '\r');

        return answers;
    }
    //
    replacements.sort((a, b) => b.word.length - a.word.length);

    console.log(replacements.map(a => a.variants))

    // replacements.slice(0, 1).forEach(replacement => {
    //     replacement.variants.forEach(variant => {
    //         const fld = writeWord(field, replacement.word, variant);
    //
    //         solveField(fld, words.concat([variant]), answers);
    //     });
    // });

    return answers;
}

export function findBestAnswer(answers: Answer[]): Answer {
    const best = answers.slice().sort((a, b) => b.words.reduce((s, w) => s + w.length, 0) - a.words.reduce((s, w) => s + w.length, 0))[0];

    printField(best.field);
    console.log(best.words);

    return best;
}

export function generateFiled(a: number = 5): Field {
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

const DICTIONARY = [
    'kek',
    'keke',
    'okek',
];

const usedWords = {};