import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
    const initialBlock = document.querySelector('.start-game');
    const form = document.getElementById('nameForm');
    const name = form.querySelector('.input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        ClientGame.init({
            tagID: 'game',
            playerName: name.value
        });
        initialBlock.parentNode.removeChild(initialBlock);
    });
});