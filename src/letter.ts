export const EMPTY = '_';

export interface Letter {
    s: string;
    i: number;
    j: number;
}

export function isEmptyCharacter(character: string): boolean {
    return character === EMPTY;
}

export function isEmptyLetter(letter: Letter): boolean {
    return isEmptyCharacter(letter.s);
}

export function createLetter(s: string, i: number, j: number): Letter {
    return {s, i, j};
}
