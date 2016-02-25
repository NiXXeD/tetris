export const PieceTypes = [

    //see https://tetris.wiki/SRS
    
    // "o"
    // _xx_
    // _xx_
    // ____
    {
        frame: 2,
        bits: [
            {ox: 1, oy: 0},
            {ox: 2, oy: 0},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1}
        ]
    },
    
    // "I"
    // ____
    // xxxx
    // ____
    // ____
    {
        frame: 8,
        bits: [
            {ox: 1, oy: 1},
            {ox: 2, oy: 1},
            {ox: 3, oy: 1},
            {ox: 4, oy: 1}
        ]
    },
    
    // "L"
    // __x
    // xxx
    // ___
    {
        frame: 1,
        bits: [
            {ox: 2, oy: 0},
            {ox: 0, oy: 1},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1}
        ]
    },

    // "J"
    // x__
    // xxx
    // ___
    {
        frame: 4,
        bits: [
            {ox: 1, oy: 0},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1},
            {ox: 3, oy: 1}
        ]
    },

    // "Z"
    // xx_
    // _xx
    // ___
    {
        frame: 0,
        bits: [
            {ox: 0, oy: 0},
            {ox: 1, oy: 0},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1}
        ]
    },

    // "S"
    // _xx
    // xx_
    // ___
    {
        frame: 3,
        bits: [
            {ox: 2, oy: 0},
            {ox: 3, oy: 0},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1}
        ]
    },

    // "T"
    // _x_
    // xxx
    // ___
    {
        frame: 10,
        bits: [
            {ox: 2, oy: 0},
            {ox: 1, oy: 1},
            {ox: 2, oy: 1},
            {ox: 3, oy: 1}
        ]
    }

]
