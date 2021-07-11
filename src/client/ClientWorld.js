import worldCfg from '../config/world.json'

class ClientWorld {
    constructor(game, engine, levelCfg) {
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            height: levelCfg.map.length,
            width: levelCfg.map[0].length
        })
    }

    init() {
        const {map} = worldCfg

        map.forEach((cfgRow, y) => {
            cfgRow.forEach((cfgCell, x) => {
                const [, , sW, sH] = this.engine.sprites.terrain[cfgCell[0]].frames[0]
                this.engine.renderSpriteFrame({
                    sprite: ['terrain', cfgCell[0]],
                    frame: 0,
                    x: x * sW,
                    y: y * sH,
                    w: sW,
                    h: sH,
                })
            })
        })
    }
}

export default ClientWorld