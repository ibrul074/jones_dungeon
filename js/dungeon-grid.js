// declare the height and width of the grid
// to put the hero ub the middle of the grid the height and width must be odd
export let gridHeight = 15;
export let gridWidth = 25;
export let dungeonGrid = []; // table where we put the dungeon tiles

/**
 * Initialize the grid in a 2d table
 */
export function initializeGrid() {
  dungeonGrid = [];

  let brokenTrapPourcentage = 0.05; // pourcentage of the tiles that are broken traps
  let trapPourcentage = 0.9; // pourcentage of the tiles that are traps

  for (let i = 0; i < gridHeight; i++) {
    // switch row
    let gridRow = []; // create a table for the row
    for (let j = 0; j < gridWidth; j++) {
      // switch column
      let nombreAleatoire = Math.random(); // // random number between [0, 1[
      if (nombreAleatoire < brokenTrapPourcentage) {
        // condition to get a broken trap
        gridRow.push('broken-trap'); // add a broken trap tile
      } else if (nombreAleatoire < trapPourcentage) {
        // condition to get a trap
        gridRow.push('trap'); // add a trap tile
      } else {
        gridRow.push('treasure'); // add a treasure tile
      }
    }
    dungeonGrid.push(gridRow); // add the complete row to the dungeon grid
  }
  //console.table(dungeonGrid);
}

/**
 * Show the grid (with images)
 */
export function showGridWithImages() {
  const container = document.getElementById('dungeon');
  container.innerHTML = ''; // Reinitialize the content of the container

  for (let i = 0; i < dungeonGrid.length; i++) {
    const rowHTML = document.createElement('div'); // Create a div element html for my row in html

    for (let j = 0; j < dungeonGrid[i].length; j++) {
      const tile = document.createElement('div'); // Create a div element html for my tile in html

      let image;
      if (dungeonGrid[i][j] === 'trap') {
        image = '/assets/64x64_trap.png'; // image of the trap tiles
      } else if (dungeonGrid[i][j] === 'broken-trap') {
        image = '/assets/64x64_trap2.png'; // image of the broken trap tiles
      } else if (dungeonGrid[i][j] === 'treasure') {
        image = '/assets/64x64_treasure.png'; // image of the treasure tiles
      } else if (dungeonGrid[i][j] === 'empty') {
        image = '/assets/64x64_empty.png'; // image of the empty tiles
      } else if (dungeonGrid[i][j] === 'hero') {
        image = '/assets/64x64_Luffy.png'; // image of the hero
      } else if (dungeonGrid[i][j] === 'ally') {
        image = '/assets/64x64_Zoro.png'; // image of the ally
      }

      if (image) {
        const img = document.createElement('img'); // Create an element img to show the right image
        img.src = image;
        tile.appendChild(img); // add the image of the tile in the div
      }

      rowHTML.appendChild(tile); // add the tile in the row
    }
    container.appendChild(rowHTML); // add the row in the container
  }
}
