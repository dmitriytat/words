import {Letter} from "./letter";

export type Word = Letter[];

export function compareWords(w1: string[], w2: string[]): boolean {
    return w1.every(word => w2.includes(word));
}

export function convertToString(word: Word): string {
    return word.reduce((str, symbol) => (str + symbol.s), '');
}
