import ClientEngine from './ClientEngine'
import ClientWorld from './ClientWorld'

import sprites from '../config/sprites'
import levelCfg from '../config/world.json'
import gameObjects from '../config/gameObjects.json'

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
            gameObjects,
            player: null,
        })

        this.engine = this.createEngine()
        this.map = this.createWorld()
        this.initEngine()
    }

    setPlayer(player) {
        this.player = player
    }

    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId), this)
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelCfg)
    }

    initEngine() {
        this.engine
            .loadSprites(sprites)
            .then(() => {
                this.map.init()
                this.engine.on('render', (_, time) => {
                    this.engine.camera.focusAtGameObject(this.player)
                    this.map.render(time)
                })
                this.engine.start()
                this.initKeys()
            })
    }

    getWorld() {
        return this.map
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowUp: (keydown) => keydown && this.movePlayerToDir('up'),
            ArrowRight: (keydown) => keydown && this.movePlayerToDir('right'),
            ArrowDown: (keydown) => keydown && this.movePlayerToDir('down'),
            ArrowLeft: (keydown) => keydown && this.movePlayerToDir('left'),
        })
    }

    movePlayerToDir(dir) {
        const dirs = {
            up: [0, -1],
            right: [1, 0],
            down: [0, 1],
            left: [-1, 0],
        }

        const {player} = this

        if (player && player.motionProgress === 1) {
            const canMovie = player.moveByCellCoord(dirs[dir][0], dirs[dir][1], (cell) => {
                return cell.findObjectsByType('grass').length
            })

            if (canMovie) {
                player.setState(dir)
                player.once('motion-stopped', () => player.setState('main'))
            }
        }
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg)
            console.log('Game INIT')
        }
    }
}

export default ClientGame