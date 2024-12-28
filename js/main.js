import { initializeHeroPosition, heroHorizontal, heroVertical, showScore, setHeroHorizontal, setHeroVertical, verifyEnergy, exitGame, endGame, points } from "/js/player.js";
import { initializeGrid, showGridWithImages } from "/js/dungeon-grid.js";
import { moveCharacter } from "/js/game-logic.js";

let newPositionHero;

function startNewGame() {
    initializeGrid();
    initializeHeroPosition();
    showScore();
    showGridWithImages();
    
    const gameOverHTML = document.getElementById('game-over');
    gameOverHTML.style.backgroundColor = ''; // css element makes the background invisible
    gameOverHTML.innerText = '';
}

const intro = document.getElementById('intro');
const introImage = document.getElementById('intro-image');

function nextIntro() {
    if (introImage.src.endsWith('/assets/Intro1.png')) {
        introImage.src = '';
        intro.classList.add('hidden');
    }

}

// click and key listener for the intro
introImage.addEventListener('click', nextIntro);
document.addEventListener('keydown', nextIntro);

startNewGame()

document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        startNewGame()
    }
    
    // Check if the game is over, if it is no more move
    if (endGame) {
        showGameOver();
        return;
    }

    let direction;

    // Check which arrow is pressed
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        direction = 'up';
    } 
    else if (event.key === 'ArrowDown') {
        event.preventDefault();
        direction = 'down';
    } 
    else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        direction = 'left';
    } 
    else if (event.key === 'ArrowRight') {
        event.preventDefault();
        direction = 'right';
    }
    else if (event.key === 'e') {
        // Press "e" to exit
        exitGame();
        showGameOver();
        return;
    }

    // If an arrow is pressed
    if (direction) {
        newPositionHero = moveCharacter(direction, 'HERO', heroVertical, heroHorizontal);
        setHeroVertical(newPositionHero.y);
        setHeroHorizontal(newPositionHero.x);
        showScore();
        showGridWithImages();

        // Check if energy is at 0
        verifyEnergy();
    }

    if (endGame) {
        showGameOver();
        return;
    }
    
});

function showGameOver() {
    const gameOverHTML = document.getElementById('game-over');
    gameOverHTML.style.backgroundColor = '#A39C98'; // add a background color
    gameOverHTML.innerText = `GAME OVER\n Points: ${points}`; // show 'GAME OVER' 
}
