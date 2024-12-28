import { dungeonGrid, gridHeight, gridWidth } from "/js/dungeon-grid.js";
import { points, energy, setPoints, setenergy, verifyEnergy } from "/js/player.js";
import { setPointsAlly, setenergyAlly, allyPoints, allyEnergy, allyVertical,allyHorizontal, transferPoints } from "/js/ally.js";

let randomNumberTrap = 0;
let pourcentageWorkingBrokenTrap = 0.5;
let trapPoints = -50;
let trapEnergy = -1;
let treasurePoints = 1000;
let emptyPoints = -10;

/**
 * Movement of the character
 * @param {string} direction direction of the character
 * @param {string} character character's name
 * @param {number} verticalPosition character's vertical position
 * @param {number} horizontalPosition character's horizontal position
 * @returns 
 */
export function moveCharacter(direction, character, verticalPosition, horizontalPosition) {

    dungeonGrid[verticalPosition][horizontalPosition] = 'empty'; // when the character moves it leaves an empty tile behind
    
    if(direction === 'up' && verticalPosition > 0) {
        verticalPosition --;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition], character); // effect only applies when the caracter moves
    }
    
    else if(direction === 'down' && verticalPosition < gridHeight-1) {
        verticalPosition ++;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition], character); // effect only applies when the caracter moves
    }
    
    else if(direction === 'left' && horizontalPosition > 0) {
        horizontalPosition --;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition], character); // effect only applies when the caracter moves
    }
    
    else if(direction === 'right' && horizontalPosition < gridWidth - 1) {
        horizontalPosition ++;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition], character); // effect only applies when the caracter moves
    }

    // Check for a collision with ally
    if (allyVertical === verticalPosition && allyHorizontal === horizontalPosition) {
        transferPoints();
    } 
    else {
        dungeonGrid[verticalPosition][horizontalPosition] = character; // Update the grid with character
    }
    dungeonGrid[verticalPosition][horizontalPosition] = character;
    //console.table(dungeonGrid);
    
    return {y: verticalPosition, x: horizontalPosition};
}

/**
 * Apply effects of the tile on the character
 * @param {number[][]} currentTile 2d table with character's current position
 * @param {string} character name of the character on the tile
 */
export function tileEffect(currentTile, character) {
    if (currentTile === 'trap') { // effect of the trap
        if (character === 'hero') {
            setPoints(points + trapPoints);
            setenergy(energy + trapEnergy);
            verifyEnergy();
        } else if (character === 'ally') {
            setPointsAlly(allyPoints + trapPoints);
            setenergyAlly(allyEnergy + trapEnergy);
        }
    }

    else if(currentTile === 'broken-trap') { // effect of the broken trap
        randomNumberTrap = Math.random();
        if(randomNumberTrap < pourcentageWorkingBrokenTrap) { // effect of the trap when it works
            if (character === 'hero') {
                setPoints(points + trapPoints);
                setenergy(energy + trapEnergy);
                verifyEnergy();
            } else if (character === 'ally') {
                setPointsAlly(allyPoints + trapPoints);
                setenergyAlly(allyEnergy + trapEnergy);
            }
        }
        else {
            if (character === 'hero') { // effect of the trap when it doesn't works
                setPoints(points + emptyPoints);
            } 
            else if (character === 'ally') {
                setPointsAlly(allyPoints + emptyPoints);
            }
        }
    }

    else if (currentTile === 'treasure') { // effect of the treasure tile
        if (character === 'hero') {
            setPoints(points + treasurePoints);
        } else if (character === 'ally') {
            setPointsAlly(allyPoints + treasurePoints);
        }
    }

    else if (currentTile === 'empty') { // effect of the empty tile
        if (character === 'hero') {
            setPoints(points + emptyPoints);
        } 
        else if (character === 'ally') {
            setPointsAlly(allyPoints + emptyPoints);
        }
    }

    else {
        console.log('Oh no!'); // effect of meeting itself or another character
    }
}
