import * as Phaser from 'phaser'

export default class PreloaderState extends Phaser.State {
    preload() {
        this.load.onLoadComplete.addOnce(() => this.ready = true)
        this.loadResources()
    }

    loadResources() {
        this.game.load.spritesheet('bit', 'assets/bit_32x32.png', 32, 32)
        this.game.load.audio('music', ['assets/music.mp3'])
    }
    
    update() {
        if (this.ready) {
            this.game.state.start('MenuState')
        }
    }

}
