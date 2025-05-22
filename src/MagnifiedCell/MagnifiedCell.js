import React from 'react';
import './MagnifiedCell.css'; 


const MagnifiedCell = ({selectedCell})=>{
    return (
        <div className='magnified-cell' id='magnified-cell'>
            <div className='magnified-cell-upper-cell'>
              {selectedCell ?  selectedCell.children[0].innerText : null}
            </div>
            <div className='magnified-cell-lower-cell'>
                {selectedCell ? selectedCell.children[1].innerText : null}
            </div>
        </div>
    )
};


export default MagnifiedCell; 