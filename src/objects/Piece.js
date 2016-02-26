import _ from 'lodash'

export default class Piece {
    constructor(game, pieceType) {
        _.merge(this, pieceType)
        this.x = null
        this.y = null
        this.spriteX = -100
        this.spriteY = -100

        _.each(this.bits, bit => {
            bit.sprite = game.add.sprite(this.spriteX, this.spriteY, 'bit', this.frame)
        })

        this.calculateBounds()
    }

    move(x, y) {
        this.spriteX = x
        this.spriteY = y

        _.each(this.bits, bit => {
            bit.sprite.x = x + (bit.ox * 32)
            bit.sprite.y = y + (bit.oy * 32)
        })
    }

    rotateLeft() {
        this.rotate([
            {ix: 0, iy: 0, ox: 0, oy: 2},
            {ix: 1, iy: 0, ox: 0, oy: 1},
            {ix: 2, iy: 0, ox: 0, oy: 0},
            {ix: 0, iy: 1, ox: 1, oy: 2},
            {ix: 1, iy: 1, ox: 1, oy: 1},
            {ix: 2, iy: 1, ox: 1, oy: 0},
            {ix: 0, iy: 2, ox: 2, oy: 2},
            {ix: 1, iy: 2, ox: 2, oy: 1},
            {ix: 2, iy: 2, ox: 2, oy: 0}
        ])
    }

    rotateRight() {
        this.rotate([
            {ix: 0, iy: 2, ox: 0, oy: 0},
            {ix: 0, iy: 1, ox: 1, oy: 0},
            {ix: 0, iy: 0, ox: 2, oy: 0},
            {ix: 1, iy: 2, ox: 0, oy: 1},
            {ix: 1, iy: 1, ox: 1, oy: 1},
            {ix: 1, iy: 0, ox: 2, oy: 1},
            {ix: 2, iy: 2, ox: 0, oy: 2},
            {ix: 2, iy: 1, ox: 1, oy: 2},
            {ix: 2, iy: 0, ox: 2, oy: 2}
        ])
    }

    rotate(rotation) {
        if (this.width === 3) {
            _.each(this.bits, bit => {
                let out = _.find(rotation, {ix: bit.ox, iy: bit.oy})
                bit.ox = out.ox
                bit.oy = out.oy
            })
        } else if (this.width === 4) {
            _.each(this.bits, bit => {
                let tmp = bit.ox
                bit.ox = bit.oy
                bit.oy = tmp
            })
        }

        this.move(this.spriteX, this.spriteY)
        this.calculateBounds()
    }

    clearLine(line) {
        let y = line - this.y

        //remove parts of the line
        let deadBits = _.filter(this.bits, bit => {
            if (bit.oy === y) {
                bit.sprite.destroy()
                return true
            }
            return false
        })
        deadBits.forEach(bit => _.pull(this.bits, bit))

        //move parts that are above down
        _.each(this.bits, bit => {
            if (bit.oy < y) {
                bit.oy++
                bit.sprite.y += 32
            }
        })

        return !!this.bits.length
    }

    calculateBounds() {
        let xArr = _.map(this.bits, 'ox')
        let yArr = _.map(this.bits, 'oy')
        this.minX = _.min(xArr)
        this.maxX = _.max(xArr)
        this.minY = _.min(yArr)
        this.maxY = _.max(yArr)
    }

    destroy() {
        _.each(this.bits, bit => {
            bit.sprite.destroy()
        })
    }
}
