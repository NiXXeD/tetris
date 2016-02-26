import * as Phaser from 'phaser'
import _ from 'lodash'
import PieceBag from 'objects/PieceBag'

export default class GameState extends Phaser.State {

    create() {
        this.pieces = []
        this.bag = new PieceBag(this.game, 2)
        this.futures = [this.bag.takeFromBag(), this.bag.takeFromBag(), this.bag.takeFromBag()]
        this.holdPiece = null
        this.currentPiece = null

        //create board
        this.boardX = 200
        this.boardY = 75
        this.board = _.range(0, 200).map(i => {
            let x = this.boardX + (i % 10) * 32
            let y = this.boardY + Math.floor(i / 10) * 32

            let sprite = this.game.add.sprite(x, y, 'bit', 11)
            sprite.sendToBack()
            return sprite
        })

        //hotkeys
        this.keys = {
            upKey: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            downKey: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            leftKey: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            rightKey: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            spaceKey: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            escKey: this.game.input.keyboard.addKey(Phaser.Keyboard.ESC)
        }
        this.keys.escKey.onDown.add(() => this.togglePause())
        this.keys.spaceKey.onDown.add(() => this.toggleHoldPiece())

        //start pieces in play
        this.nextPiece()
        this.toggleHoldPiece()
        this.currentPiece.previouslyHeld = false
    }
    
    nextPiece(piece) {
        if (piece) {
            this.currentPiece = piece
        } else {
            this.currentPiece = this.futures.shift()
            this.nextFuture()
        }

        let offset = Math.floor((10 - this.currentPiece.width) / 2)
        let x = this.boardX + (offset * 32)
        let y = this.boardY
        this.currentPiece.move(x, y)
    }

    nextFuture() {
        this.futures.push(this.bag.takeFromBag())

        _.each(this.futures, (future, index) => {
            let x = 550 + (future.width === 3 ? 16 : 0)
            let y = 75 + (100 * index)
            future.move(x, y)
        })
    }

    addPiece() {
        let x = _.random(0, this.game.world.width - 150)
        let y = _.random(0, this.game.world.height / 2)
        let piece = this.bag.takeFromBag()
        piece.move(x, y)
        this.pieces.push(piece)
    }

    toggleHoldPiece() {
        if (!this.currentPiece.previouslyHeld) {
            let oldHold = this.holdPiece
            this.holdPiece = this.currentPiece

            this.nextPiece(oldHold)

            this.currentPiece.previouslyHeld = true

            let x = 50
            let y = this.boardY
            this.holdPiece.move(x, y)
        }
    }

    update() {
        // if (this.keys.upKey.downDuration(250)) {
        //
        // }

        if (this.currentPiece) {
            let piece = this.currentPiece

            if (piece.y > this.game.world.height) {
                _.pull(this.pieces, piece)
                piece.destroy()
                this.nextPiece()
            } else {
                piece.moveRelative(0, 3)
            }
        }
    }

    togglePause() {
        this.game.paused = !this.game.paused
    }
}
