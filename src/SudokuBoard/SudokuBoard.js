import React from "react";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuPad from "../SudokuPad/SudokuPad";
import getPuzzle, { copySudoku, isBoardFull, isBoardValid, getSpecificPuzzle } from "../helpers";
import './SudokuBoard.css';
import HintBox from "../HintBox/HintBox";
import MagnifiedCell from '../MagnifiedCell/MagnifiedCell';

const SudokuBoard = ({ puzzleInfo, setPuzzleInfo, setIsSavedPuzzleUsed }) => {
    const [selectedCell, setSelectedCell] = React.useState(null);
    const [invalidCell, setInvalidCell] = React.useState(null);
    const [valid, setValid] = React.useState(true);
    const orignialSudoku = React.useRef(null);
    const [sudoku, setSudoku] = React.useState(null);
    const [hintCell, setHintCell] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [puzzleId, setPuzzleId] = React.useState(null);
    const messageDiv = React.useRef(document.getElementById('message-div'));


    const [isOn, setIsOn] = React.useState(true);

    React.useMemo(()=>{
        setTimeout(()=>setIsOn(false), 5000);
    }, []);

    // for updating entire board from within child
    const [_, update] = React.useState(null);

    if (sudoku) {
        const testIfInvalid = isBoardValid(sudoku);
        if (valid && !testIfInvalid) {
            selectedCell.classList.add('invalid-cell');
            setValid(false);
            setInvalidCell(selectedCell);
        }
        else if (!valid && testIfInvalid) {
            invalidCell.classList.remove('invalid-cell');
            setValid(true);
            setInvalidCell(null);
        }

        if (isBoardFull(sudoku) && valid) {
            if (messageDiv.current) {
                messageDiv.current.innerText = 'You Win!';
            }
        }
        else {
            if (messageDiv.current) {
                messageDiv.current.innerText = '';
            }
        }

    }

    function resetBoard(puzzle) {
        // reset grid
        const gridDiv = document.querySelector('#grid-div');
        let children = gridDiv.children;
        let gridInd = null ;
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(gridInd === null)  gridInd = 0; 
                const cell = children[gridInd];
                cell.children[1].innerText = '';


                if(puzzle[i][j] === '0'){
                    cell.children[0].innerText = '';
                }

                gridInd++; 
            }
        }

        // reset selectedCell
        if (selectedCell) {
            selectedCell.classList.remove('selected-cell');
            setSelectedCell(null);
        }

        // reset hintCell 
        if (hintCell) {
            hintCell.classList.remove('hintCell');
            setHintCell(null);
        }

        // reset magnified cell
        const magnifiedCell = document.getElementById('magnified-cell');
        if (magnifiedCell) {
            magnifiedCell.children[0].innerText = '';
            magnifiedCell.children[1].innerText = '';
        }

    }



    async function selectPuzzle(evt) {
        let level = evt.target.value;

        const data = await getPuzzle(level);
        const puzzle = data.puzzle;
        resetBoard(puzzle);

        orignialSudoku.current = puzzle;
        setSudoku(copySudoku(puzzle));
        setPuzzleId(data.puzzleId);
        setLevel(level);
        if (setPuzzleInfo) {
            setPuzzleInfo({ puzzle: copySudoku(puzzle), level, puzzleId: data.puzzleId });
        }
        if (setIsSavedPuzzleUsed) {
            setIsSavedPuzzleUsed(false);
        }
    }


    React.useEffect(() => {
        async function loadPuzzle() {
            let puzzle = null;
            let level = null;
            let puzzleId = null;
            let notes = null; 

            let originalPuzzle = null;
            if (!puzzleInfo) {
                level = 'one';
                const data = await getPuzzle(level);
                puzzleId = data.puzzleId;
                puzzle = data.puzzle;

                originalPuzzle = puzzle;
            }
            else {
                level = puzzleInfo.level;
                puzzle = puzzleInfo.puzzle;
                puzzleId = puzzleInfo.puzzleId;
                notes = puzzleInfo.notes; 
                originalPuzzle = await getSpecificPuzzle(level, puzzleId); 
                originalPuzzle = originalPuzzle.puzzle; 
            }
            orignialSudoku.current = originalPuzzle;
            setSudoku(copySudoku(puzzle));
            setPuzzleId(puzzleId);
            setLevel(level);
            if (setPuzzleInfo) {
                setPuzzleInfo({ puzzle: copySudoku(puzzle), level, puzzleId, notes });
            }
        }
        loadPuzzle();
    }, []);

    if (!sudoku) return '';

    return (
        <div className='sudoku-board'>

            <div className='sudoku-board-sudoku-grid'>
                <SudokuGrid setHintCell={setHintCell} hintCell={hintCell} setSelectedCell={setSelectedCell} invalidCell={invalidCell} sudoku={sudoku} puzzleInfo={puzzleInfo} originalSudoku={orignialSudoku.current} />
            </div>
            {isOn ?
                null
                :
                <div className='difficulty-selector'>
                    <label for='difficulty-selector'>Difficulty: </label>
                    <select id='difficulty-selector' className='sudoku-board-select' onChange={selectPuzzle}>
                       <option value='one'>Level One</option>
                        <option value='two'>Level Two</option>
                        <option value='three'>Level Three</option>
                    </select>
                </div>
            }
            <div className='hint-box'>
                {isOn ? null : <HintBox sudoku={sudoku} selectedCell={selectedCell} hintCell={hintCell} setHintCell={setHintCell} setSelectedCell={setSelectedCell} />}
            </div>
            {isOn ? 
                null : 
                selectedCell ? <div className='sudoku-board-magnified-cell'><MagnifiedCell selectedCell={selectedCell} /></div> : null
            }
            <div className='clearFloat'></div>

            <div className='sudoku-board-sudoku-pad'>
                {isOn ? null : <SudokuPad selectedCell={selectedCell} setPuzzleInfo={setPuzzleInfo} update={update} sudoku={sudoku} setSudoku={setSudoku} />}
            </div> 
        </div>
    );


};




export default SudokuBoard;