import * as Phaser from 'phaser'
import _ from 'lodash'
import Piece from 'objects/Piece'

export default class GameState extends Phaser.State {

    create() {
        this.pieces = []
        this.futures = []

        //create board
        let boardX = 200
        let boardY = 75
        this.board = _.map(_.range(0, 200), i => {
            let x = boardX + (i % 10) * 32
            let y = boardY + Math.floor(i / 10) * 32

            this.game.add.sprite(x, y, 'bit', 11)
        })
        
        this.game.time.events.repeat(250, 1000, () => this.addPiece())
    }
    
    addPiece() {
        let x = _.random(0, this.game.world.width - 150)
        let y = _.random(0, this.game.world.height / 2)
        let piece = new Piece(this.game)
        piece.move(x, y)
        this.pieces.push(piece)
    }

    update() {
        _.each(this.pieces, piece => {
            if (piece) {
                if (piece.y > this.game.world.height) {
                    _.pull(this.pieces, piece)
                    piece.destroy()
                } else {
                    piece.moveRelative(0, 1)
                }
            }
        })
    }
}
