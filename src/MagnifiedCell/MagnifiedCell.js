import React from 'react';
import './MagnifiedCell.css'; 


const MagnifiedCell = ({selectedCell})=>{
    return (
        <div className='magnified-cell' id='magnified-cell'>
            <div className='magnified-cell-upper-cell'>
                {selectedCell.children[0].innerText}
            </div>
            <div className='magnified-cell-lower-cell'>
                {selectedCell.children[1].innerText}
            </div>
        </div>
    )
};


export default MagnifiedCell; 