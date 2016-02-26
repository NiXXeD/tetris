//see https://tetris.wiki/SRS
export const PieceTypes = [
    {
        frame: 2,
        bits: [
            {ox: 1, oy: 0},  // "o"
            {ox: 2, oy: 0},  // _xx_
            {ox: 1, oy: 1},  // _xx_
            {ox: 2, oy: 1}   // ____
        ]
    }, {
        frame: 8,
        bits: [
            {ox: 1, oy: 1},  // "I"
            {ox: 2, oy: 1},  // ____
            {ox: 3, oy: 1},  // xxxx
            {ox: 4, oy: 1}   // ____
        ]
    }, {
        frame: 1,
        bits: [
            {ox: 2, oy: 0},  // "L"
            {ox: 0, oy: 1},  // __x
            {ox: 1, oy: 1},  // xxx
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 4,
        bits: [
            {ox: 1, oy: 0},  // "J"
            {ox: 1, oy: 1},  // x__
            {ox: 2, oy: 1},  // xxx
            {ox: 3, oy: 1}   // ___
        ]
    }, {
        frame: 0,
        bits: [
            {ox: 0, oy: 0},  // "Z"
            {ox: 1, oy: 0},  // xx_
            {ox: 1, oy: 1},  // _xx
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 3,
        bits: [
            {ox: 2, oy: 0},  // "S"
            {ox: 3, oy: 0},  // _xx
            {ox: 1, oy: 1},  // xx_
            {ox: 2, oy: 1}   // ___
        ]
    }, {
        frame: 10,
        bits: [
            {ox: 2, oy: 0},  // "T"
            {ox: 1, oy: 1},  // _x_
            {ox: 2, oy: 1},  // xxx
            {ox: 3, oy: 1}   // ___
        ]
    }

]
