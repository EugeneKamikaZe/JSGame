import './index.scss'
import SenseiWalk from './assets/Male-5-Walk.png'
import terrainAtlas from './assets/terrain.png'
import ClientGame from './client/ClientGame'

window.addEventListener('load', () => {
    ClientGame.init({tagId: 'game'})
})

const loading = document.getElementById('loading')

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const spriteW = 48
const spriteH = 48
const shots = 3
let cycle = 0
let direction = 0

let upPress = false
let rightPress = false
let bottomPress = false
let leftPress = false

let pY = 270
let pX = 270

// function keyDownHandler(e) {
//     if (e.key === 'Up' || e.key === 'ArrowUp') {
//         upPress = true
//     }
//     if (e.key === 'Right' || e.key === 'ArrowRight') {
//         rightPress = true
//     }
//     if (e.key === 'Down' || e.key === 'ArrowDown') {
//         bottomPress = true
//     }
//     if (e.key === 'Left' || e.key === 'ArrowLeft') {
//         leftPress = true
//     }
// }

// function keyUpHandler(e) {
//     if (e.key === 'Up' || e.key === 'ArrowUp') {
//         upPress = false
//     }
//     if (e.key === 'Right' || e.key === 'ArrowRight') {
//         rightPress = false
//     }
//     if (e.key === 'Down' || e.key === 'ArrowDown') {
//         bottomPress = false
//     }
//     if (e.key === 'Left' || e.key === 'ArrowLeft') {
//         leftPress = false
//     }
// }

// document.addEventListener('keydown', keyDownHandler)
// document.addEventListener('keyup', keyUpHandler)

// const img = document.createElement('img')
// img.src = SenseiWalk
//
// function walk() {
//     if (upPress) {
//         cycle = (cycle + 1) % shots
//         direction = 144
//         if (pY !== 0) {
//             pY += -10
//         }
//     }
//     if (rightPress) {
//         cycle = (cycle + 1) % shots
//         direction = 96
//         if (pX !== 560) {
//             pX += 10
//         }
//     }
//     if (bottomPress) {
//         cycle = (cycle + 1) % shots
//         direction = 0
//         if (pY !== 550) {
//             pY += 10
//         }
//     }
//     if (leftPress) {
//         cycle = (cycle + 1) % shots
//         direction = 48
//         if (pX !== 0) {
//             pX += -10
//         }
//     }
//
//     ctx.clearRect(0, 0, 600, 600)
//     ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, 48, 48)
//
//     window.requestAnimationFrame(walk)
// }
//
// img.addEventListener('load', () => {
//     loading.style.display = 'none'
//
//     window.requestAnimationFrame(walk)
// })
//
// const terrain = document.createElement('img')
// terrain.src = terrainAtlas

// terrain.addEventListener('load', () => {
//     const {map} = worldCfg
//     map.forEach((cfgRow, y) => {
//         cfgRow.forEach((cfgCell, x) => {
//             const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0]
//             ctx.drawImage(terrain, sX, sY, sW, sH, x*spriteW, y*spriteH, spriteW, spriteH)
//         })
//     })
// })