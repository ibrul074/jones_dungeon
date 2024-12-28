import {
  initializeHeroPosition,
  heroHorizontal,
  heroVertical,
  showScore,
  setHeroHorizontal,
  setHeroVertical,
  verifyEnergy,
  exitGame,
  endGame,
  points,
} from '/js/player.js';
import { initializeGrid, showGridWithImages } from '/js/dungeon-grid.js';
import { moveCharacter } from '/js/game-logic.js';
import { initializePositionAlly, moveAlly, showScoreAlly } from '/js/ally.js';

let newPositionHero;

/**
 * Initialize a new game
 */
function startNewGame() {
  initializeGrid(); // initialize the grid
  initializeHeroPosition(); // Hero at start position
  initializePositionAlly(); // Ally at start position
  showScore(); // show the score of the hero
  showScoreAlly(); // show the score of the ally
  showGridWithImages(); // show the grid (images)

  const gameOverHTML = document.getElementById('game-over');
  gameOverHTML.style.backgroundColor = ''; // css element makes the background invisible
  gameOverHTML.innerText = '';
}

const intro = document.getElementById('intro'); // goes into the intro element in html
const introImage = document.getElementById('intro-image'); // goes into the intro-image elment in html

function avancerIntro() {
  if (introImage.src.endsWith('/assets/introGame1.png')) {
    // first page
    introImage.src = '/assets/introGame2.png'; // show second page
  } else if (introImage.src.endsWith('/assets/introGame2.png')) {
    // if second page we hide it
    introImage.src = '';
    intro.classList.add('hidden');
  }
}

// click and key listener for the intro
introImage.addEventListener('click', avancerIntro);
document.addEventListener('keydown', avancerIntro);

// start a new game
startNewGame();

/**
 * Add key listener to start a game, finish a game and move
 */
document.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    startNewGame();
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
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    direction = 'down';
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    direction = 'left';
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    direction = 'right';
  } else if (event.key === 'e' || event.key === 'E') {
    // Press "e" to exit
    exitGame();
    showGameOver();
    return;
  }

  // If an arrow is pressed, move in that direction
  if (direction) {
    newPositionHero = moveCharacter(
      direction,
      'hero',
      heroVertical,
      heroHorizontal,
    ); // move the hero
    setHeroVertical(newPositionHero.y); // modify the vertical position of the hero
    setHeroHorizontal(newPositionHero.x); // modify the horizontal position of the hero
    showGridWithImages(); // show grid

    moveAlly(direction); // move ally (oppose direction of the hero)
    showScore(); // show hero's score
    showScoreAlly(); // show ally's score
    showGridWithImages(); // show grid

    // Check if energy is at 0
    verifyEnergy();
  }

  if (endGame) {
    showGameOver(); // show GAME OVER
    return;
  }
});

/**
 * show the GAME OVER message with the points and invite the player to start a new game
 */
function showGameOver() {
  const gameOverHTML = document.getElementById('game-over');
  gameOverHTML.style.backgroundColor = '#4a4441'; // add a background color
  gameOverHTML.innerText = `GAME OVER\n Points: ${points}\n r for a new game`; // 'GAME OVER' appear
}
