import { gridHeight, gridWidth, dungeonGrid } from "/js/dungeon-grid.js";

export let points = 0;
let initialEnergy = 40;
export let energy = initialEnergy;
export let endGame = false;

/**
 * Set points obtained by the hero
 * @param {number} pointsParametre points obtained by the hero
 */
export function setPoints(pointsParametre) {
    points = pointsParametre;
}

/**
 * Set hero's energy
 * @param {number} energyParameter hero's energy
 */
export function setenergy(energyParameter) {
    energy = energyParameter;
}

/**
 * Show hero's score
 */
export function showScore() {
    console.log('Points: '+ points);

    // Update points in the html
    const pointsHTML = document.getElementById('points');
    pointsHTML.innerText = `Points: ${points}`;

    console.log('energy: '+ energy);
    // Update energy in the html
    const energyHTML = document.getElementById('energy');
    energyHTML.innerText = `energy: ${energy}`;

    const energyBar = document.getElementById('energy-bar');
    energyBar.style.width = `${(energy / initialEnergy) * 100}%`;
}

export let heroVertical, heroHorizontal;

/**
 * Set the vertical position of the character in the grid
 * @param {number} verticalPosition character's vertical position
 */
export function setHeroVertical(verticalPosition) {
    heroVertical = verticalPosition;
}

/**
 * Set the horizontal position of the character in the grid
 * @param {number} horizontalPosition character's horizontal position
 */
export function setHeroHorizontal(horizontalPosition) {
    heroHorizontal = horizontalPosition;
}

/**
 * Initialize hero's position
 */
export function initializeHeroPosition() {
    points = 0;
    energy = initialEnergy;
    endGame = false;

    // initialize the hero at the center of the grid
    heroVertical = Math.floor(gridHeight/2); // index of the centre (vertical axis)
    heroHorizontal = Math.floor(gridWidth/2); // index of the centre (horizontal axis)

    dungeonGrid[heroVertical][heroHorizontal] = 'hero';
    console.table(dungeonGrid); // show the grid in the console
}

/**
 * Check if the energy is at 0 to end the game
 */
export function verifyEnergy() {
    if (energy <= 0) {
        console.log('GAME OVER');
        showScore();
        endGame = true;
    }
}

/**
 * End the game when called
 */
export function exitGame() {
    console.log('Goodbye!');
    showScore();
    endGame = true;
}