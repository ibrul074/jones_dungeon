import { dungeonGrid, gridHeight, gridWidth } from "/js/dungeon-grid.js";
import { tileEffect } from "/js/game-logic.js";
import { heroVertical, heroHorizontal, points, setPoints } from "/js/player.js";

export let allyVertical = 0; // Vertical position of the ally
export let allyHorizontal = 0; // Horizontal position of the ally
export let allyInitialEnergy = 15; // Initial energy
export let allyEnergy = allyInitialEnergy; // set to initial energy
export let allyPoints = 0; // initial amount of points

/**
 * Initialize the position of the ally
 */
export function initializePositionAlly() {
    // Place the ally close to the center
    allyVertical = heroVertical + 1;
    allyHorizontal = heroHorizontal + 1;
    allyEnergy = allyInitialEnergy;
    allyPoints = 0;
    dungeonGrid[allyVertical][allyHorizontal] = 'ally';
}

/**
 * Show the score of the ally
 */
export function showScoreAlly() {
    console.log('Points ally: '+ allyPoints);

    // Update points in the html
    const pointsHTML = document.getElementById('points-ally');
    pointsHTML.innerText = `Points ally: ${allyPoints}`; // show the current amount of points of the ally

    console.log('Energy ally: '+ allyEnergy);
    // Update energy in the html
    const energyHTML = document.getElementById('energy-ally');
    energyHTML.innerText = `Energy ally: ${allyEnergy}`; // show the current energy of the ally

    const energyBar = document.getElementById('energy-ally-bar');
    energyBar.style.width = `${(allyEnergy / allyInitialEnergy) * 100}%`; // show energy bar
}

/**
 * Movement of the ally in the grid
 * @param {string} direction direction of the hero (selected by the player)
 * @returns ally moves within the grid
 */
export function moveAlly(direction) {
    if (allyEnergy <= 0) return; // If the ally doesn't have energy, he can't move

    dungeonGrid[allyVertical][allyHorizontal] = 'empty'; // Leaves an empty tile behind

    // Moves on the opposite direction
    if(direction === 'down' && allyVertical > 0) {
        allyVertical --;
    }
    
    else if(direction === 'up' && allyVertical < gridHeight-1) {
        allyVertical ++;
    }
    
    else if(direction === 'right' && allyHorizontal > 0) {
        allyHorizontal --;
    }
    
    else if(direction === 'left' && allyHorizontal < gridWidth - 1) {
        allyHorizontal ++;
    }

    // Apply the effect of the tile
    tileEffect(dungeonGrid[allyVertical][allyHorizontal], 'ally'); // effects apply even without movement

    // Check for collision with the hero
    if (allyVertical === heroVertical && allyHorizontal === heroHorizontal) {
        transferPoints();
    } 
    else {
        dungeonGrid[allyVertical][allyHorizontal] = 'ally'; // Update the grid with the ally
    }
}

/**
 * Set points obtained by the ally
 * @param {number} pointsAlly ally's points
 */
export function setPointsAlly(pointsAlly) {
    allyPoints = pointsAlly;
}

/**
 * Set ally's energy
 * @param {number} energyAlly ally's energy
 */
export function setenergyAlly(energyAlly) {
    allyEnergy = energyAlly;
}

/**
 * Transfer points from the ally to the hero
 */
export function transferPoints() {
    // Add ally's points to the hero
    setPoints(points + allyPoints)
    allyPoints = 0; // ally doesn't have points
    allyEnergy = 0; // ally doesn't have energy and disappear
    dungeonGrid[allyVertical][allyHorizontal] = 'empty';
}