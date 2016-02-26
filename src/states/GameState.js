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
            qKey: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
            wKey: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            spaceKey: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            escKey: this.game.input.keyboard.addKey(Phaser.Keyboard.ESC)
        }
        this.keys.upKey.onDown.add(() => this.slamPiece())
        this.keys.qKey.onDown.add(() => this.currentPiece.rotateLeft())
        this.keys.wKey.onDown.add(() => this.currentPiece.rotateRight())
        this.keys.escKey.onDown.add(() => this.togglePause())
        this.keys.spaceKey.onDown.add(() => this.toggleHoldPiece())
        this.moveTime = 0
        this.lastMove = 0

        //start music
        this.music = this.game.add.audio('music')
        this.music.play()
        this.music.onStop.add(() => this.music.play())

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

        this.currentPiece.x = Math.floor((10 - this.currentPiece.width) / 2)
        this.currentPiece.y = this.currentPiece.startOffset
        this.positionCurrentPiece()
        this.lastMove = this.game.time.now + 300
        
        if (!this.hitCheck(0, 0)) {
            this.game.state.start('GameOverState')
        }
    }

    positionCurrentPiece() {
        let x = this.boardX + this.currentPiece.x * 32
        let y = this.boardY + this.currentPiece.y * 32
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

    slamPiece() {
        let y = 1
        while(this.hitCheck(0, y)) {
            y++
        }
        this.currentPiece.y += y - 1
        this.positionCurrentPiece()
        this.pieces.push(this.currentPiece)
        this.checkCompletedLines()
        this.nextPiece()
    }

    movePiece(dx, dy) {
        if (this.game.time.now > this.moveTime) {
            this.moveTime = this.game.time.now + 75
            if (this.hitCheck(dx, dy)) {
                this.currentPiece.x += dx
                this.currentPiece.y += dy
                this.positionCurrentPiece()
            } else {
                if (dy) {
                    this.pieces.push(this.currentPiece)
                    this.checkCompletedLines()
                    this.nextPiece()
                }
            }
        }
    }

    checkCompletedLines() {
        let board = {}
        _.each(this.pieces, piece => {
            _.each(piece.bits, bit => {
                let y = piece.y + bit.oy
                board[y] = (board[y] || 0) + 1
            })
        })
        
        _.forIn(board, (count, line) => {
            if (count === 10) {
                this.clearLine(line)
            }
        })
    }
    
    clearLine(line) {
        let deadPieces = _.filter(this.pieces, piece => {
            return !piece.clearLine(line)
        })
        _.each(deadPieces, piece => _.pull(this.pieces, piece))
    }

    hitCheck(dx, dy) {
        let left = this.currentPiece.x + dx
        let right = this.currentPiece.x + dx + this.currentPiece.maxX
        let bottom = this.currentPiece.y + dy + this.currentPiece.maxY

        if (left < 0 - this.currentPiece.minX || right > 9) {
            return false
        } else if (bottom > 19) {
            return false
        } else {
            let bits = this.currentPiece.bits
            let x = this.currentPiece.x + dx
            let y = this.currentPiece.y + dy

            return !_.some(this.pieces, boardPiece => {
                return _.some(boardPiece.bits, boardBit => {
                    return _.some(bits, curBit => {
                        let bx = boardPiece.x + boardBit.ox
                        let by = boardPiece.y + boardBit.oy
                        let cx = x + curBit.ox
                        let cy = y + curBit.oy

                        return bx === cx && by === cy
                    })
                })
            })
        }
    }

    update() {
        if (this.keys.downKey.isDown) {
            this.movePiece(0, 1)
        } else if (this.keys.leftKey.isDown) {
            this.movePiece(-1, 0)
        } else if (this.keys.rightKey.isDown) {
            this.movePiece(1, 0)
        } else {
            this.moveTime = 0
        }

        if (this.game.time.now > this.lastMove) {
            this.lastMove = this.game.time.now + 300
            this.movePiece(0, 1)
        }
    }

    togglePause() {
        this.game.paused = !this.game.paused
    }
}
