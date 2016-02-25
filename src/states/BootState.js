import * as Phaser from 'phaser'

export default class BootState extends Phaser.State {

    preload() {
        // this.load.image('preloader', 'assets/preloader.gif')
    }

    create() {
        // configure game
        this.game.input.maxPointers = 1

        if (this.game.device.desktop) {

            // desktop settings
            this.game.scale.pageAlignHorizontally = true

        } else {

            //mobile settings
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            this.game.scale.minWidth = 480
            this.game.scale.minHeight = 260
            this.game.scale.maxWidth = 1024
            this.game.scale.maxHeight = 768
            this.game.scale.forceOrientation(true)
            this.game.scale.pageAlignHorizontally = true
            this.game.scale.setScreenSize(true)

        }

        this.game.state.start('PreloaderState')
    }

}
