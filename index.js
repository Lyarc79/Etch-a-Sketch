
const mainContainer = document.getElementById('sketch');
/*
function createGrid(gridSize){
    for(let i = 0; i < gridSize * gridSize; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        mainContainer.appendChild(square);
    }
}
*/

function createRows(container, number){
    for(let i = 0; i < number; i++){
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    }
}

function createSquares(container, number){
    for(let i = 0; i < number; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

function createSketch(number){
    createRows(mainContainer, number);
    const rowsCreated = document.getElementsByClassName('row');
    for(let i = 0; i < rowsCreated.length; i++) {
        createSquares(rowsCreated[i], number);
    }
}

createSketch(32);