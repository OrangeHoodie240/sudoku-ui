import React, { useEffect } from 'react';
import './SudokuCell.css';


const SudokuCell = ({cellRow, cellCol, value, given, notes})=>{
    const notGiven = !given;
    const upperCellClasses = (given) ? 'upper-cell given' : 'upper-cell';     
    

    return (<>
                        <div id={'sudoku-cell-' + cellRow + '-' + cellCol} data-row={cellRow} data-col={cellCol} className='outer-cell' data-not-given={notGiven}>
                            <div className={upperCellClasses}>{(value === '0') ? '' : value}</div>
                            <div className='lower-cell' data-notes={notes}>{notes}</div>
                        </div>
                    
            </>);
}; 



export default SudokuCell;