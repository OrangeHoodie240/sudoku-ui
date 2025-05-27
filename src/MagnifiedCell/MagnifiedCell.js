import React from 'react';
import './MagnifiedCell.css'; 


const MagnifiedCell = ({selectedCell, puzzleInfo})=>{
    const rowCol = selectedCell ? `${selectedCell.getAttribute('data-row')}${selectedCell.getAttribute('data-col')}` : ''; 
    const notes = puzzleInfo && puzzleInfo.notes && puzzleInfo.notes[rowCol] && puzzleInfo.notes[rowCol].size > 0 ? puzzleInfo.notes[rowCol] : ''; 
    return (
        <div className='magnified-cell' id='magnified-cell'>
            <div className='magnified-cell-upper-cell'>
              {selectedCell ?  selectedCell.children[0].innerText : null}
            </div>
            <div className='magnified-cell-lower-cell'>
                {selectedCell ? notes : null}
            </div>
        </div>
    )
};


export default MagnifiedCell; 