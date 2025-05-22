import React from "react";
import SudokuCell from "../SudokuCell/SudokuCell";
import './SudokuGrid.css';


const SudokuGrid = ({ setSelectedCell, originalSudoku, invalidCell, hintCell, setHintCell, puzzleInfo}) => {

    const gridDiv = React.useRef(null);

    function onClick({ target }) {
        if (target !== gridDiv) {
            target = target.parentElement;
            if(hintCell && hintCell !== target){
                    hintCell.classList.remove('hintCell'); 
                    setHintCell(null);
            }

            if (target.getAttribute('data-not-given') === 'false') return;

            if (invalidCell && target !== invalidCell) {
                document.querySelector('.sudoku-pad-values').focus();
                return;
            }

            const children = gridDiv.current.children;
            const childrenLength = children.length;
            let selectedCell = null;
            for (let i = 0; i < childrenLength; i++) {
                const child = children[i];
                if (child === target) {
                    child.classList.add('selected-cell');
                    selectedCell = child;
                }
                else {
                    child.classList.remove('selected-cell');
                }

            }
            setSelectedCell(selectedCell);
            document.querySelector('.sudoku-pad-values').focus();
        }
    }

    React.useEffect(() => {
        gridDiv.current = document.getElementById('grid-div');
    }, []);

    if(!puzzleInfo) return null;


    const gridArray = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let given = (originalSudoku && originalSudoku[i][j] !== '0') ? true : false;
            const notes = puzzleInfo && puzzleInfo.notes && puzzleInfo.notes[i + '' + j] ? new Array(...puzzleInfo.notes[i + '' + j]).join('') : '';
            gridArray.push(<SudokuCell key={i + '-' + j} cellRow={i} cellCol={j} value={puzzleInfo.puzzle[i][j]} given={given} notes={notes} />);
        }
    }






    return (
        <div id='outer-grid-div'>
            <div className='grid-hor-bar' id='grid-first-hor-bar'></div>
            <div className='grid-hor-bar' id='grid-second-hor-bar'></div>
            <div className='grid-ver-bar' id='grid-first-ver-bar'></div>
            <div className='grid-ver-bar' id='grid-second-ver-bar'></div>
            <div className='grid-div' id='grid-div' onClick={setSelectedCell ? onClick : null}>
                {gridArray}
            </div>
        </div>
    );
};


export default SudokuGrid;