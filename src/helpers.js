

async function getPuzzle(level) {
    const url = 'http://127.0.0.1:5000/sudoku?level=' + level;
    console.log(url);
    const puzzle = await fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Error! Status:", resp.status);
            }
            return resp.json();
        })
        .then(data => {
            return data.data;
        })
        .catch(err => console.error(err));

    return puzzle;
}

async function getSpecificPuzzle(level,id) {
    const url = 'http://127.0.0.1:5000/sudoku/' + level + '/' + id;
    const puzzle = await fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Error! Status:", resp.status);
            }
            return resp.json();
        })
        .then(data => {
            return data.data;
        })
        .catch(err => console.error(err));

    return puzzle;
}

function flattenPuzzle(puzzle){
    let flatPuzzle = [];
    for(let i = 0; i < 9; i++){
        flatPuzzle.push(...puzzle[i]);
    }

    return flatPuzzle.join(',');
}

function copySudoku(sudoku) {
    const copy = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(sudoku[i][j]);
        }
        copy.push(row);
    }
    return copy;
}

function isBoardFull(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === '0') return false;
        }
    }
    return true;
}

function isBoardValid(sudoku) {
    // check by rows
    for (let i = 0; i < 9; i++) {
        let row = sudoku[i];

        // test if any duplicates occur
        const count = row.reduce((a, b) => {
            if (b === '0') return a;
            if (a[b]) {
                a.areDuplicates = true;
            }
            else {
                a[b] = 1;
            }
            return a;
        }, {});

        if (count.areDuplicates) {
            return false;
        }
    }


    for (let i = 0; i < 9; i++) {
        // get columns
        let col = [];
        for (let j = 0; j < 9; j++) {
            col.push(sudoku[j][i]);
        }

        // test if any duplicates occur
        const count = col.reduce((a, b) => {
            if (b === '0') return a;
            if (a[b]) {
                a.areDuplicates = true;
            }
            else {
                a[b] = 1;
            }
            return a;
        }, {});

        if (count.areDuplicates) {
            return false;
        }
    }

    for (let i = 0; i < 9; i += 3) {
        // get boxes
        let boxes = [[], [], []];
        for (let j = 0; j < 3; j++) {
            const rowA = [];
            const rowB = [];
            const rowC = [];
            for (let k = 0; k < 3; k++) {
                rowA.push(sudoku[j + i][k]);
                rowB.push(sudoku[j + i][k + 3]);
                rowC.push(sudoku[j + i][k + 6]);

            }
            boxes[0].push(...rowA);
            boxes[1].push(...rowB);
            boxes[2].push(...rowC);
        }
        for (let box of boxes) {
            //test if any duplicates occur 
            // test if any duplicates occur
            const count = box.reduce((a, b) => {
                if (b === '0') return a;
                if (a[b]) {
                    a.areDuplicates = true;
                }
                else {
                    a[b] = 1;
                }
                return a;
            }, {});

            if (count.areDuplicates) {
                return false;
            }
        }
    }
    return true;
}

function convertDBPuzzle(puzzle){
    puzzle = JSON.parse(puzzle); 
    let newNotes = {};
    for(let key in puzzle.puzzleNotes){
        newNotes[key] = new Set(puzzle.puzzleNotes[key].split(''));
    }
    return [puzzle.puzzleCells, newNotes];
}

function convertTo2DArray(puzzle){
    puzzle = puzzle.split(',');
    let puzzleArray = [];
    for(let i = 0; i < 9; i++){
        let row = [];
        for(let j = 0; j < 9; j++){
            row.push(puzzle.shift()); 
        }
        puzzleArray.push(row);
    }
    return puzzleArray; 
}

export default getPuzzle;
export { copySudoku, isBoardFull, isBoardValid, flattenPuzzle, convertTo2DArray, getSpecificPuzzle, convertDBPuzzle };