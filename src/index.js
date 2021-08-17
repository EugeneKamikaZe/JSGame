import {io} from 'socket.io-client'
import './index.scss'
import ClientGame from './client/ClientGame'
import {getTime} from './common/util'

window.addEventListener('load', () => {
    const socket = io('https://jsprochat.herokuapp.com')

    const $startGame = document.querySelector('.start-game')
    const $nameForm = document.getElementById('nameForm')
    const $name = document.getElementById('name')

    const $chatWrap = document.querySelector('.chat-wrap')
    const $form = document.getElementById('form')
    const $input = document.getElementById('input')

    const $message = document.querySelector('.message')
    const $online = document.querySelector('.online')

    const myStorage = window.localStorage;
    const $story = document.querySelector('.history')

    const submitName = (e) => {
        e.preventDefault()

        if ($name.value) {
            ClientGame.init({
                tagID: 'game',
                playerName: $name.value
            })

            socket.emit('start', $name.value)

            $chatWrap.style.display = 'block'
            $nameForm.removeEventListener('submit', submitName)
            $startGame.remove()
        }
    }

    $nameForm.addEventListener('submit', submitName)

    $form.addEventListener('submit', (e) => {
        e.preventDefault()

        if ($input.value) {
            socket.emit('chat message', $input.value)

            $input.value = ''
        }
    })

    function message(data) {
        $message.insertAdjacentHTML('beforeend', `<p><b>${getTime(data.time)}</b> - ${data.msg}</p>`)
        myStorage.setItem('story', $message.innerText)
    }

    socket.on('chat online', (data) => {
        $online.innerHTML = `<p>Online: ${data.online}</p>`
        console.log(data)
    })

    socket.on('chat connection', (data) => {
        message(data)

        $story.addEventListener('click', (e) => {
            e.preventDefault()
        })
    })

    socket.on('chat disconnect', (data) => {
        message(data)
    })

    socket.on('chat message', (data) => {
        message(data)
    })
})