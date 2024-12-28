import { gridHeight, gridWidth, dungeonGrid } from "/js/dungeon-grid.js";

export let points = 0;
let initialEnergy = 40;
export let energy = initialEnergy;
export let endGame = false;

export function setPoints(pointsParameter) {
    points = pointsParameter;
}

export function setEnergy(energyParameter) {
    energy = energyParameter;
}

export function showScore() {
    console.log('Points: '+ points);

    // Update points in the html
    const pointsHTML = document.getElementById('points');
    pointsHTML.innerText = `Points: ${points}`;

    console.log('energy: '+ energy);
    // update energy in the html
    const energyHTML = document.getElementById('energy');
    energyHTML.innerText = `energy: ${energy}`;

    const energyBar = document.getElementById('energy-bar');
    energyBar.style.width = `${(energy / initialEnergy) * 100}%`;
}

export let heroVertical, heroHorizontal;
// add a setter to modify the poition of the hero
export function setHeroVertical(verticalPosition) {
    heroVertical = verticalPosition;
}

export function setHeroHorizontal(horizontalPosition) {
    heroHorizontal = horizontalPosition;
}

export function initializeHeroPosition() {
    points = 0;
    energy = initialEnergy;
    endGame = false;

    // initialize the hero at the center of the grid
    heroVertical = Math.floor(gridHeight/2); // index of the centre (vertical axis)
    heroHorizontal = Math.floor(gridWidth/2); // index of the centre (horizontal axis)

    dungeonGrid[heroVertical][heroHorizontal] = 'HERO';
    console.table(dungeonGrid); // show the grid in the console
}

export function verifyEnergy() {
    if (energy <= 0) {
        console.log('GAME OVER');
        showScore();
        endGame = true;
    }
}

export function exitGame() {
    console.log('Goodbye!');
    showScore();
    endGame = true;
}