
// This is all for the sketch creation
const mainContainer = document.getElementById('sketch');

function createRows(container, number) {
    for (let i = 0; i < number; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    }
}

function createSquares(container, number) {
    for (let i = 0; i < number; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

function createSketchPad(number) {
    createRows(mainContainer, number);
    const rowsCreated = document.getElementsByClassName('row');
    for (let i = 0; i < rowsCreated.length; i++) {
        createSquares(rowsCreated[i], number);
    }
}


createSketchPad(32);

// Color picker event
const colorPicker = document.getElementById('color-picker');
let currentColor = colorPicker.value;
colorPicker.addEventListener('input', function (event){
    const selectedColor = event.target.value;
    currentColor = selectedColor;
})

// Random RGB picker
const randomRGBbtn = document.getElementById('randomColorBtn');
let isRandomRGBMode = false;
randomRGBbtn.addEventListener('click', () => {
    isRandomRGBMode = !isRandomRGBMode;
    randomRGBbtn.textContent = isRandomRGBMode ? 'Random Color Mode (On)' : 'Random Color Mode (Off)';
})

// Function to get the random RGB
function getRandomRGBColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// This do the painting
function sketchDrawing() {
    const squares = document.getElementsByClassName('square');
    let isDrawing = false;

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('mousedown', () => {
            isDrawing = true;
        });

        squares[i].addEventListener('mouseup', () => {
            isDrawing = false;
        });

        squares[i].addEventListener('mouseover', (e) => {
            if (isDrawing) {
                console.log("Drawing...");

                if(isRandomRGBMode){
                    currentColor = getRandomRGBColor();
                }
                squares[i].style.backgroundColor = currentColor;
            }
        })
    }
}

sketchDrawing();

// Grid resizing button
const resizeBtn = document.getElementById('resizeBtn');
resizeBtn.addEventListener('click', () => {
    let answer = prompt("Please enter your desired size");
    answer = parseInt(answer);
    if (answer > 100) {
        answer = 100;
    } else if (answer <= 0) {
        answer = 1;
    }
    mainContainer.innerHTML = '';
    createSketchPad(answer);
    sketchDrawing();
})


