
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
colorPicker.addEventListener('input', function (event) {
    const selectedColor = event.target.value;
    currentColor = selectedColor;
})

// Color button
const colorBtn = document.getElementById('colorBtn');
colorBtn.addEventListener('click', () =>{
    colorBtn.classList.toggle('active');
    eraseBtn.classList.remove('active');
    randomRGBbtn.classList.remove('active');
    isRandomRGBMode = false;
    isErasing = false;
    currentColor = colorPicker.value;
})

// Random RGB picker
const randomRGBbtn = document.getElementById('randomColorBtn');
let isRandomRGBMode = false;
randomRGBbtn.addEventListener('click', () => {
    isRandomRGBMode = !isRandomRGBMode;
    randomRGBbtn.classList.toggle('active', isRandomRGBMode);
    eraseBtn.classList.remove('active');
    colorBtn.classList.remove('active');
})

// Function to get the random RGB color
function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// Eraser
const eraseBtn = document.getElementById('eraseBtn');
let isErasing = false;
eraseBtn.addEventListener('click', () => {
    isErasing = !isErasing;
    eraseBtn.classList.toggle('active', isErasing);
    randomRGBbtn.classList.remove('active');
    colorBtn.classList.remove('active');
});

mainContainer.addEventListener('mousemove', (e) =>{
    if(isErasing && e.buttons === 1){
        const square = e.target;
        if(square.classList.contains('square')){
            square.style.backgroundColor = 'transparent';
        }
    }
})

// Clear grid
const clearBtn = document.getElementById('clearBtn');
const squares = document.getElementsByClassName('square');
clearBtn.addEventListener('click', () => {
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = 'transparent';
    }
})


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

                if (isRandomRGBMode) {
                    currentColor = getRandomRGBColor();
                }
                squares[i].style.backgroundColor = currentColor;
            }
        })
        squares[i].addEventListener('dragstart', (e) => {
            e.preventDefault();
        })
    }
}

sketchDrawing();

// Grid resizing slider
const slider = document.getElementById('slider');
const sliderSizeDisplay = document.getElementById('sliderSizeDisplay');

slider.addEventListener('input', () => {
    const newSize = slider.value;
    sliderSizeDisplay.textContent = `${newSize} x ${newSize}`;
    mainContainer.innerHTML = '';
    createSketchPad(newSize);
    sketchDrawing();
})

