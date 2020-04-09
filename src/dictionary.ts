import wordsDictionary from "../singularbylength.json";
import {convertToString, Word} from "./word";

const memo: { [key: string]: string[] } = {};

export function findVariants(word: Word): string[] {
    const str = convertToString(word);

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
