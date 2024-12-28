import { dungeonGrid, gridHeight, gridWidth } from "/js/dungeon-grid.js";
import { points, energy, setPoints, setEnergy, verifyEnergy } from "/js/player.js";

let trapPoints = -50;
let trapEnergy = -1;
let treasurePoints = 1000;
let emptyPoints = -10;

export function moveCharacter(direction, character, verticalPosition, horizontalPosition) {

    dungeonGrid[verticalPosition][horizontalPosition] = 'empty'; // when the character moves it leaves an empty tile behind
    if(direction === 'up' && verticalPosition > 0) {
        verticalPosition --;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition]);
    }
    
    else if(direction === 'down' && verticalPosition < gridHeight-1) {
        verticalPosition ++;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition]);
    }
    
    else if(direction === 'left' && horizontalPosition > 0) {
        horizontalPosition --;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition]);
    }
    
    else if(direction === 'right' && horizontalPosition < gridWidth - 1) {
        horizontalPosition ++;
        tileEffect(dungeonGrid[verticalPosition][horizontalPosition]);
    }
    dungeonGrid[verticalPosition][horizontalPosition] = character;
    console.table(dungeonGrid);
    
    return {y: verticalPosition, x: horizontalPosition};
}

export function tileEffect(currentTile) {
    if(currentTile === 'trap') {
        setPoints(points + trapPoints);
        setEnergy(energy + trapEnergy);
        verifyEnergy();
    }

    else if(currentTile === 'treasure') {
        setPoints(points + treasurePoints);
    }

    else if(currentTile === 'empty') {
        setPoints (points -+ emptyPoints);
    }

    else {
        console.log('Oh no!'); // effect of meeting itself or another character
    }
}
