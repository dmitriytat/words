import {
    findBestAnswer,
    findEmpty,
    findUnCompletedWords,
    findVariants,
    findWords,
    getNeighbours, printField,
    solveField
} from "./index";


describe('All', function () {
    describe('words empty', function () {
        it('should find empty in row', function () {
            const field = [
                ['_', '_'],
                ['_', 'a']
            ];

            expect(findEmpty(field)).toEqual([
                [
                    {s: '_', i: 0, j: 0},
                ],
                [
                    {s: '_', i: 0, j: 1},
                ],
                [
                    {s: '_', i: 1, j: 0},
                ]
            ])
        });
    });

    describe('findUnCompletedWords', function () {
        it('should findUnCompletedWords', function () {
            const field = [
                ['_', '_'],
                ['a', 'b']
            ];

            expect(findUnCompletedWords(field)).toEqual([
                [
                    {
                        "i": 0,
                        "j": 0,
                        "s": "_"
                    },
                    {
                        "i": 1,
                        "j": 0,
                        "s": "a"
                    }
                ],
                [
                    {
                        "i": 0,
                        "j": 0,
                        "s": "_"
                    },
                    {
                        "i": 1,
                        "j": 0,
                        "s": "a"
                    },
                    {
                        "i": 1,
                        "j": 1,
                        "s": "b"
                    }
                ],
                [
                    {
                        "i": 0,
                        "j": 1,
                        "s": "_"
                    },
                    {
                        "i": 1,
                        "j": 1,
                        "s": "b"
                    }
                ],
                [
                    {
                        "i": 0,
                        "j": 1,
                        "s": "_"
                    },
                    {
                        "i": 1,
                        "j": 1,
                        "s": "b"
                    },
                    {
                        "i": 1,
                        "j": 0,
                        "s": "a"
                    },
                ],
            ])
        });
    });

    describe('getNeighbours', function () {
        it('should getNeighbours', function () {
            const field = [
                ['_', '_'],
                ['_', 'a']
            ];

            const symbol = {s: '_', i: 0, j: 0};

            expect(getNeighbours(field, symbol)).toEqual([
                {s: '_', i: 0, j: 1},
                {s: '_', i: 1, j: 0},
            ]);
        });
    });

    describe('solveField', function () {
        it('should solveField', function () {
            const field = [
                ['_', '_', '_', '_', '_'],
                ['_', '_', '_', '_', '_'],
                ['ш', 'у', 'т', 'к', 'а'],
                ['_', '_', '_', '_', '_'],
                ['_', '_', '_', '_', '_'],
            ];

            printField(field);

            expect(findBestAnswer(solveField(field, [], []))).toEqual([]);
        });
    });

    describe('findVariants', function () {
        it('should findVariants', function () {
            const word = [
                {s: '_', i: 0, j: 1},
                {s: 'б', i: 0, j: 1},
                {s: 'б', i: 0, j: 1},
                {s: 'а', i: 0, j: 1},
                {s: 'т', i: 0, j: 1},
                {s: 'и', i: 0, j: 1},
                {s: 'с', i: 0, j: 1},
                {s: 'а', i: 0, j: 1}
            ];

            expect(findVariants(word)).toEqual(["аббатиса"]);
        });
    });

    describe('findWords', function () {
        it('should findWords', function () {
            const field = [
                ['_', '_', '_'],
                ['_', 'a', '_'],
                ['_', 'b', 'c']
            ];

            const word = [{s: '_', i: 0, j: 1}];

            expect(findWords(field, word)).toEqual([
                [
                    {s: '_', i: 0, j: 1},
                    {s: 'a', i: 1, j: 1},
                ],
                [
                    {s: '_', i: 0, j: 1},
                    {s: 'a', i: 1, j: 1},
                    {s: 'b', i: 2, j: 1},
                ],
                [
                    {s: '_', i: 0, j: 1},
                    {s: 'a', i: 1, j: 1},
                    {s: 'b', i: 2, j: 1},
                    {s: 'c', i: 2, j: 2},
                ]
            ]);
        });
    });
});