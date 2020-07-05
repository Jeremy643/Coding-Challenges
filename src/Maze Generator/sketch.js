let w = 40;
let cols, rows;
let grid = [];
let mazePath = [];
let headCell;

function setup() {
    createCanvas(800, 800);

    cols = floor(width/w);
    rows = floor(height/w);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        // cells at the edges of the grid won't have certain walls
        if (j === 0) {
          cell.walls[0] = false;
        }
        if (j === rows-1) {
          cell.walls[2] = false;
        }
        if (i === 0) {
          cell.walls[3] = false;
        }
        if (i === cols-1) {
          cell.walls[1] = false;
        }
        grid.push(cell);
      }
    }

    // we start at (0,0) and mark that cell visited
    headCell = grid[0];
    headCell.visited = true;
    headCell.head = true;
}

function draw() {
    background('rgb(96,96,96)');

    if (mazePath.length === 0) {
      headCell.head = false;
    }

    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    // unvistedCells = mapping of wall to cell
    unvistedCells = checkUnvisitedNeighbours();

    if (unvistedCells.size === 0) {
      // all neighbouring cells have been visited
      if (mazePath.length === 0) {
        // back at the start node
        console.log(`Maze Created!`);
        // headCell.head = false;
        noLoop();
      } else {
        // go to the previous visited cell in the path
        headCell.head = false;
        headCell = mazePath.pop();
        headCell.head = true;
      }
    } else {
      // there's at least one neighbouring cell that is unvisited
      mazePath.push(headCell);
      let itemSet = Array.from(unvistedCells);
      let randCell = itemSet[floor(random() * itemSet.length)];
      randCell[1].visited = true;
      /*
      the wall to be deleted for the new cell is opposite to the
      wall deleted for the head cell
      */
      if (randCell[0] < 2) {
        randCell[1].walls[randCell[0] + 2] = false;
      } else {
        randCell[1].walls[randCell[0] - 2] = false;
      }
      headCell.walls[randCell[0]] = false;
      headCell.head = false;
      // set the head cell to be the new randomly chosen cell
      headCell = randCell[1];
      headCell.head = true;
    }
}

function checkUnvisitedNeighbours() {
  let unvistedCells = new Map();
  let index = grid.indexOf(headCell);

  /*
  Check all four possible positions for a neighbouring cell
  If the cell exists, check that it hasn't been visited
  If both conditions are met then add the cell to the map
  Where the keys correspond to the positions
  0 - Top, 1 - Right, 2 - Bottom, 3 - Left
  */
  if (grid[index-20] !== undefined && !grid[index-20].visited) {
    unvistedCells.set(0, grid[index-20]);
  }
  if (grid[index+1] !== undefined && ((index+1) % 20) !== 0 && !grid[index+1].visited) {
    unvistedCells.set(1, grid[index+1]);
  }
  if (grid[index+20] !== undefined && !grid[index+20].visited) {
    unvistedCells.set(2, grid[index+20]);
  }
  if (grid[index-1] !== undefined && (index % 20) !== 0 && !grid[index-1].visited) {
    unvistedCells.set(3, grid[index-1]);
  }
  return unvistedCells;
}

// function depthFirstSearch(cell) {
//   // let unvistedCells = [];
//   let unvistedCells = new Map();
//   let index = grid.indexOf(cell);
//
//   // if (grid[index-20] !== undefined && !grid[index-20].visited) {
//   //   unvistedCells.push(grid[index-20]);
//   // }
//   // if (grid[index+1] !== undefined && !grid[index+1].visited) {
//   //   unvistedCells.push(grid[index+1]);
//   // }
//   // if (grid[index+20] !== undefined && !grid[index+20].visited) {
//   //   unvistedCells.push(grid[index+20]);
//   // }
//   // if (grid[index-1] !== undefined && !grid[index-1].visited) {
//   //   unvistedCells.push(grid[index-1]);
//   // }
//
//   cell.walls.forEach((wall, i) => {
//     if (wall) {
//       switch (i) {
//         case 0:
//           // unvistedCells.push(grid[index-20]);
//           unvistedCells.set(0, grid[index-20]);
//           break;
//         case 1:
//           // unvistedCells.push(grid[index+1]);
//           unvistedCells.set(1, grid[index+1]);
//           break;
//         case 2:
//           // unvistedCells.push(grid[index+20]);
//           unvistedCells.set(2, grid[index+20]);
//           break;
//         case 3:
//           // unvistedCells.push(grid[index-1]);
//           unvistedCells.set(3, grid[index-1]);
//           break;
//         default:
//           console.log(`Error with index.`);
//       }
//     }
//   });
//
//   // console.log(unvistedCells);
//
//   if (unvistedCells.size === 0) {
//     // reached dead-end, pop of unvistedNeighStack
//     depthFirstSearch(unVisNeighStack.pop());
//   } else if (unvistedCells.size > 1) {
//     unVisNeighStack.push(cell);
//   }
//
//   //let randIndex = random(0, unvistedCells.length-1);
//   let itemSet = Array.from(unvistedCells);
//   let randIndex = itemSet[floor(random() * itemSet.length)];
//   // console.log(randIndex);
//   // unvistedCells[randIndex].visited = true;
//   // unvistedCells[randIndex].walls[] = false;
//   // console.log(unvistedCells.get(randIndex));
//   // unvistedCells.get(randIndex).visited = true;
//   // unvistedCells.get(randIndex).walls[randIndex] = false;
//   // console.log(randIndex[1].visited);
//   randIndex[1].visited = true;
//   randIndex[1].walls[randIndex[0]] = false;
//   // depthFirstSearch(unvistedCells[randIndex]);
//   depthFirstSearch(randIndex[1]);
// }

// function mouseClicked() {
//   x = mouseX;
//   y = mouseY;
//
//   if (x <= width && y <= height) {
//     console.log(`On the canvas! (${x},${y})`);
//
//     let xRem = x % w;
//     let yRem = y % w;
//     x -= xRem;
//     y -= yRem;
//     let row = x / w;
//     let col = y / w;
//     let index = row + (col*20);
//     grid[index].highlight();
//   } else {
//     console.log(`Not on the canvas! (${x},${y})`);
//   }
// }
