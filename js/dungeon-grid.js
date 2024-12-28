// declare the height and width of the grid
// to put the hero ub the middle of the grid the height and width must be odd
export let gridHeight = 15;
export let gridWidth = 25;
export let dungeonGrid = []; // table where we put the dungeon tiles


export function initializeGrid (){
    dungeonGrid = [];

    let trapPourcentage = 0.9; // pourcentage of the tiles that are traps

    for(let i = 0; i < gridHeight; i++){ // switch row
        let gridRow = []; // create a table for the row
        for(let j = 0; j < gridWidth; j++) { // switch column
            let randomNumber = Math.random(); // random number between [0, 1[
            if(randomNumber < trapPourcentage) { // condition to get a trap
                gridRow.push('trap'); // add a trap tile
            }
            else {
                gridRow.push('treasure'); // add a treasure tile
            }
        }
        dungeonGrid.push(gridRow); // add the complete row to the dungeon grid
    }
}

export function showGridWithImages() {
    const container = document.getElementById('dungeon');
    container.innerHTML = ''; // Reinitialize the content of the container

    for (let i = 0; i < dungeonGrid.length; i++) {
        const row = document.createElement('div');

        for (let j = 0; j < dungeonGrid[i].length; j++) {
            const cell = document.createElement('div');
            
            let image;
            if (dungeonGrid[i][j] === 'trap') {
                image = '/assets/64x64_trap.png'; // image of the trap tiles
            } else if (dungeonGrid[i][j] === 'treasure') {
                image = '/assets/64x64_treasure.png'; // image of the treasure tiles
            } else if (dungeonGrid[i][j] === 'empty') {
                image = '/assets/64x64_empty.png'; // image of the empty tiles
            } else if (dungeonGrid[i][j] === 'HERO') {
                image = '/assets/64x64_Luffy.png'; // image of the hero
            }

            if (image) {
                const img = document.createElement('img');
                img.src = image;
                cell.appendChild(img);
            }

            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
