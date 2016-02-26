import _ from 'lodash'
import {PieceTypes} from 'objects/PieceTypes'
import Piece from 'objects/Piece'

export default class PieceBag {
    constructor(game, bagSize) {
        this.game = game
        this.bagSize = bagSize
        this.bag = []

        this.fillBag()
    }

    takeFromBag() {
        if (!this.bag.length) {
            this.fillBag()
        }

        let pieceType = _.sample(this.bag)
        _.pull(this.bag, pieceType)
        return new Piece(this.game, pieceType)
    }

    fillBag() {
        this.bag = []
        for (let x = 0; x < this.bagSize; x++) {
            let temp = _.cloneDeep(PieceTypes)
            this.bag = this.bag.concat(_.shuffle(temp))
        }
    }
}
