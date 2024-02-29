let currentPlayer = "X";

// Build the grid with a specific size
const generateGrid = (size) => {
  let table = document.getElementById("board");
  table.innerHTML = "";
  for (var i = 0; i < size; i++){
    // Create rows first
    let row = document.createElement("tr");
    for (var j = 0; j < size; j++){
      // Then in each row, create the cells
      // Each cell will have an 'x' attribute - its horizontal coordinate, and a 'y' attribute - its vertical coordinate
      let cell = document.createElement("td");
      cell.setAttribute("class", "cell");
      cell.setAttribute("x", i);
      cell.setAttribute("y", j);

      // Attach event handler to the cells as we build them
      cell.onclick = () => {
        cell.innerHTML = currentPlayer;
        calculateScore(size, currentPlayer, parseInt(cell.getAttribute('x')), parseInt(cell.getAttribute('y')));
        // Toggle the current player (this is leveraging the ternary operator)
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        document.getElementById("player").innerHTML = `Current player: ${currentPlayer}`
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.getElementById("player").innerHTML = 'Current player: X'
}

// Calculate score as each cell is clicked
const calculateScore = (size, player, x, y) => {
  document.getElementById("result").innerHTML = "";
  // Following variables tell us if the cell that was clicked is on one of the two diagonals
  let onDiag1 = x == y;
  let onDiag2 = x + y == size-1;

  // Then we initialize our win variables to be true if it is possible to win that way
  // We can always win a row or a column, and we can only win the diagonals if we clicked on one of the cells in the diagonals in the first place
  let winRow = true;
  let winCol = true;
  let winDiag1 = onDiag1;
  let winDiag2 = onDiag2;

  // We use Array.from here because getElementsByClassName returns an HTMLCollection, which is too complicated here
  let cells = Array.from(document.getElementsByClassName("cell"));

  // Now we iterate through all the cells in the grid
  cells.forEach(cell => {
    // First we get the coordinates of the current cell
    let cellx = parseInt(cell.getAttribute('x'));
    let celly = parseInt(cell.getAttribute('y'));

    // We check for column matching: if we find any cell in the grid with the same x as the cell that was clicked and that does NOT have the current player - that means the row is not won. Note that we do not flip winRow back to true. 
    if (cellx == x && cell.innerHTML != player){
      winRow = false;
    }
    // Same with the other direction
    if (celly == y && cell.innerHTML != player){
      winCol = false;
    }
    // For the top-left to bottom-right diagonal, we use the fact that x and y are the same for those cells
    if (onDiag1 && cellx == celly && cell.innerHTML != player){
      winDiag1 = false;
    }
    // For the top-right to bottom-left diagonal, adding the two coordinates returns the grid size minus one, but only for the diagonal cells
    if (onDiag2 && cellx + celly == size - 1 && cell.innerHTML != player){
      winDiag2 = false;
    }
  });
  // If none of the possible ways to win was proven false, the current player wins
  if (winRow || winCol || winDiag1 || winDiag2) {
    document.getElementById("result").innerHTML = player + " WINS"
  }
}

document.getElementById("initialize").onclick = () =>  {
  generateGrid(3);
}
