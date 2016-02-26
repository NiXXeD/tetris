//see https://tetris.wiki/SRS
export const PieceTypes = [
    {
        frame: 2,
        width: 4,
        bits: [
            {ox: 1, oy: 0},  // "o"
            {ox: 2, oy: 0},  // _xx_
            {ox: 1, oy: 1},  // _xx_
            {ox: 2, oy: 1}   // ____
        ]
    }, {
        frame: 8,
        width: 4,
        bits: [
            {ox: 0, oy: 1},  // "I"
            {ox: 1, oy: 1},  // ____
            {ox: 2, oy: 1},  // xxxx
            {ox: 3, oy: 1}   // ____
        ]
    }, {
        frame: 1,
        width: 3,
        bits: [
            {ox: 2, oy: 0},  // "L"
            {ox: 0, oy: 1},  // __x
            {ox: 1, oy: 1},  // xxx
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 4,
        width: 3,
        bits: [
            {ox: 0, oy: 0},  // "J"
            {ox: 0, oy: 1},  // x__
            {ox: 1, oy: 1},  // xxx
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 0,
        width: 3,
        bits: [
            {ox: 0, oy: 0},  // "Z"
            {ox: 1, oy: 0},  // xx_
            {ox: 1, oy: 1},  // _xx
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 3,
        width: 3,
        bits: [
            {ox: 1, oy: 0},  // "S"
            {ox: 2, oy: 0},  // _xx
            {ox: 0, oy: 1},  // xx_
            {ox: 1, oy: 1}   // ___
        ]
    }, {
        frame: 10,
        width: 3,
        bits: [
            {ox: 1, oy: 0},  // "T"
            {ox: 0, oy: 1},  // _x_
            {ox: 1, oy: 1},  // xxx
            {ox: 2, oy: 1}   // ___
        ]
    }
]
