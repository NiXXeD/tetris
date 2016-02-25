import * as Phaser from 'phaser'
import BootState from 'states/BootState'
import PreloaderState from 'states/PreloaderState'
import MenuState from 'states/MenuState'
import GameState from 'states/GameState'

class Game extends Phaser.Game {

    constructor() {
        super(1024, 768, Phaser.AUTO, 'content', null)

        //states
        this.state.add('BootState', BootState, false)
        this.state.add('PreloaderState', PreloaderState, false)
        this.state.add('MenuState', MenuState, false)
        this.state.add('GameState', GameState, false)

        //initial state
        this.state.start('BootState')
    }

}

new Game()
