import './board.js';
import './recorder.js';

const registration = navigator.serviceWorker.register('./serviceWorker.js');
document.addEventListener('DOMContentLoaded', () => {
    const refreshBotton = document.querySelector('button[role="button"]');
    const board = document.querySelector('multipliction-board');
    const allSuccessRecorder = document.querySelector('recording-component[data-role="all-success"]');
    const successRecorder = document.querySelector('recording-component[data-role="success"]');
    const mistakeRecorder = document.querySelector('recording-component[data-role="mistake"]');
    refreshBotton.onclick = () => {
        board.render();
    }
    board.addEventListener('play-all-success', () => {
        allSuccessRecorder.play();
    })
    board.addEventListener('play-success', () => {
        successRecorder.play();
    });
    board.addEventListener('play-mistake', () => {
        mistakeRecorder.play();
    })


})
