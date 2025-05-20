import React from "react";
import './SudokuPad.css';
import { copySudoku } from '../helpers';


const SudokuPad = ({ selectedCell, sudoku, setSudoku, update, setPuzzleInfo}) => {
    const cellValuesToggleButton = React.useRef(null);
    const notesToggleButton = React.useRef(null);
    const sudokuPadValues = React.useRef(null);
    const sudokuPadNotes = React.useRef(null);

    React.useEffect(() => {
        // cellValuesToggleButton.current = document.getElementById('sudoku-pad-cell-values-toggle-button');
        // cellValuesToggleButton.current.addEventListener('click', onClickSudokuPadToggle);
        notesToggleButton.current = document.getElementById('sudoku-pad-notes-toggle-button');
        sudokuPadValues.current = document.getElementById('sudoku-pad-values');
        sudokuPadNotes.current = document.getElementById('sudoku-pad-notes');
        sudokuPadNotes.current.style.display = 'none';
    }, [])

    function onClickValue({ target }) {
        if (!target.classList.contains('sudoku-pad-digit-button')) return;
        if (!selectedCell) return;
        const row = Number(selectedCell.getAttribute('data-row'));
        const col = Number(selectedCell.getAttribute('data-col'));

        const upperCellOfSelectedCell = selectedCell.children[0];
        const value = target.innerText;
        if (upperCellOfSelectedCell.innerText.trim() === value) {
            upperCellOfSelectedCell.innerText = '';
            sudoku[row][col] = '0';
            setSudoku(copySudoku(sudoku));
            setPuzzleInfo(puzzleInfo => {
                const newInfo = {};
                newInfo.puzzleId = puzzleInfo.puzzleId; 
                newInfo.level = puzzleInfo.level; 
                newInfo.puzzle = copySudoku(sudoku); 
                return newInfo;
            });
            return;
        }

        upperCellOfSelectedCell.innerText = value;
        sudoku[row][col] = value;
        setSudoku(copySudoku(sudoku));
        setPuzzleInfo(puzzleInfo => {
            const newInfo = {};
            newInfo.puzzleId = puzzleInfo.puzzleId; 
            newInfo.level = puzzleInfo.level; 
            newInfo.puzzle = copySudoku(sudoku); 
            return newInfo;
        });

    }


    function onKeyUp(evt) {
        if (!selectedCell) return;

        const set = {'!': 1,'@': 2,'#':3,'$':4,'%': 5,'^': 6,'&': 7,'*': 8,'(':9};
        const key = evt.key;
        if (!['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
            if(set.hasOwnProperty(evt.key)){
                onKeyUpNote(set[evt.key]);
            }
            return;
        }
        const row = Number(selectedCell.getAttribute('data-row'));
        const col = Number(selectedCell.getAttribute('data-col'));
        const upperCellOfSelectedCell = selectedCell.children[0];
        if (upperCellOfSelectedCell.innerText.trim() === key) {
            upperCellOfSelectedCell.innerText = '';
            sudoku[row][col] = '0';
            setSudoku(copySudoku(sudoku));
            setPuzzleInfo(puzzleInfo => {
                const newInfo = {};
                newInfo.puzzleId = puzzleInfo.puzzleId; 
                newInfo.level = puzzleInfo.level; 
                newInfo.puzzle = copySudoku(sudoku); 
                return newInfo;
            });
            return;
        }
        upperCellOfSelectedCell.innerText = key;
        sudoku[row][col] = key;
        setSudoku(copySudoku(sudoku));
        setPuzzleInfo(puzzleInfo => {
            const newInfo = {};
            newInfo.puzzleId = puzzleInfo.puzzleId; 
            newInfo.level = puzzleInfo.level; 
            newInfo.puzzle = copySudoku(sudoku); 
            return newInfo;
        });
    }

    function onKeyUpNote(value) {
        const lowerCellOfSelectedCell = selectedCell.children[1];
        const noteValue = '' + value;
        let lowerCellNotes = lowerCellOfSelectedCell.getAttribute('data-notes');
        if (!lowerCellNotes) {
            lowerCellOfSelectedCell.setAttribute('data-notes', noteValue);
            lowerCellOfSelectedCell.innerText = noteValue;
            update(Math.random());
            return;
        }
        lowerCellNotes = lowerCellNotes.split(',');
        let lowerCellNotesLength = lowerCellNotes.length;
        for (let i = 0; i < lowerCellNotesLength; i++) {
            if (lowerCellNotes[i] === noteValue) {
                lowerCellNotes.splice(i, 1);
                lowerCellNotes.sort();
                lowerCellOfSelectedCell.innerText = lowerCellNotes.join(' ');
                lowerCellOfSelectedCell.setAttribute('data-notes', lowerCellNotes.join(','));
                update(Math.random());
                return;
            }
        }
        lowerCellNotes.push(noteValue);
        lowerCellNotes.sort();
        lowerCellOfSelectedCell.innerText = lowerCellNotes.join(' ');
        lowerCellOfSelectedCell.setAttribute('data-notes', lowerCellNotes.join(','));
        update(Math.random());
    }


    function onClickNote({ target }) {
        if (!target.classList.contains('sudoku-pad-digit-button')) return;
        if (!selectedCell) return;

        const lowerCellOfSelectedCell = selectedCell.children[1];
        const noteValue = target.innerText.trim();
        let lowerCellNotes = lowerCellOfSelectedCell.getAttribute('data-notes');
        if (!lowerCellNotes) {
            lowerCellOfSelectedCell.setAttribute('data-notes', noteValue);
            lowerCellOfSelectedCell.innerText = noteValue;
            update(Math.random());
            return;
        }
        lowerCellNotes = lowerCellNotes.split(',');
        let lowerCellNotesLength = lowerCellNotes.length;
        for (let i = 0; i < lowerCellNotesLength; i++) {
            if (lowerCellNotes[i] === noteValue) {
                lowerCellNotes.splice(i, 1);
                lowerCellNotes.sort();
                lowerCellOfSelectedCell.innerText = lowerCellNotes.join(' ');
                lowerCellOfSelectedCell.setAttribute('data-notes', lowerCellNotes.join(','));
                update(Math.random());
                return;
            }
        }
        lowerCellNotes.push(noteValue);
        lowerCellNotes.sort();
        lowerCellOfSelectedCell.innerText = lowerCellNotes.join(' ');
        lowerCellOfSelectedCell.setAttribute('data-notes', lowerCellNotes.join(','));
        update(Math.random());
    }



    function onClickSudokuPadToggle(evt) {
        if (cellValuesToggleButton.current === evt.target) {
            cellValuesToggleButton.current.setAttribute('disabled', true);
            notesToggleButton.current.removeAttribute('disabled');
            sudokuPadValues.current.style.display = '';
            sudokuPadNotes.current.style.display = 'none';

            sudokuPadValues.current.focus();
        }
        else {
            notesToggleButton.current.setAttribute('disabled', true);
            cellValuesToggleButton.current.removeAttribute('disabled');
            sudokuPadNotes.current.style.display = '';
            sudokuPadValues.current.style.display = 'none';
        }
    }



    const valueDivs = [];
    const noteDivs = [];
    for (let i = 1; i < 10; i++) {
        valueDivs.push(<div className='sudoku-pad-digit-button'>{i}</div>);
        noteDivs.push(<div className='sudoku-pad-digit-button' >{i}</div>);
    }

    return (
        <div className={'sudoku-pad'}>
            <div id='sudoku-pad-buttons'>
                {/* <button id='sudoku-pad-cell-values-toggle-button' disabled>Cell Values</button> */}
                {/* <button id="sudoku-pad-notes-toggle-button" onClick={onClickSudokuPadToggle} >Notes</button> */}
            </div>
            <div tabindex='0' onClick={onClickValue} onKeyUp={onKeyUp} id='sudoku-pad-values' className='sudoku-pad-values'>
                {/* {valueDivs} */}
            </div>
            <div onClick={onClickNote} className='sudoku-pad-notes' id='sudoku-pad-notes'>
                {/* {noteDivs} */}
            </div>
        </div>

    );
};


export default SudokuPad;