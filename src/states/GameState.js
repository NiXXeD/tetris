import * as Phaser from 'phaser'
import _ from 'lodash'
import PieceBag from 'objects/PieceBag'

export default class GameState extends Phaser.State {

    create() {
        this.pieces = []
        this.bag = new PieceBag(this.game, 3)
        this.futures = [this.bag.takeFromBag(), this.bag.takeFromBag(), this.bag.takeFromBag()]
        this.holdPiece = null
        this.currentPiece = null

        //create board
        this.boardX = 200
        this.boardY = 75
        this.board = _.range(0, 200).map(i => {
            let x = this.boardX + (i % 10) * 32
            let y = this.boardY + Math.floor(i / 10) * 32

            this.game.add.sprite(x, y, 'bit', 11)
        })

        //hotkeys
        this.keys = {
            upKey: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            downKey: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            leftKey: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            rightKey: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            escKey: this.game.input.keyboard.addKey(Phaser.Keyboard.ESC)
        }
        this.keys.escKey.onDown.add(() => this.togglePause())
        
        this.game.time.events.repeat(250, 1000, () => this.addPiece())
    }
    
    nextPiece() {
        this.currentPiece = this.futures.shift()
        this.futures.push(this.bag.takeFromBag())
    }

    addPiece() {
        let x = _.random(0, this.game.world.width - 150)
        let y = _.random(0, this.game.world.height / 2)
        let piece = this.bag.takeFromBag()
        piece.move(x, y)
        this.pieces.push(piece)
    }

    update() {
        // if (this.keys.upKey.downDuration(250)) {
        //
        // }

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

    togglePause() {
        this.game.paused = !this.game.paused
    }
}
