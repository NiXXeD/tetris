import * as Phaser from 'phaser'

export default class PreloaderState extends Phaser.State {
    preload() {
        // this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader')
        // this.load.setPreloadSprite(this.asset)

        this.load.onLoadComplete.addOnce(() => this.ready = true)
        this.loadResources()
    }

    loadResources() {
        this.game.load.spritesheet('bit', 'assets/bit_32x32.png', 32, 32)
    }

    create() {
        
    }
    
    update() {
        if (this.ready) {
            // this.game.state.start('MenuState')
            this.game.state.start('GameState')
        }
    }

}
