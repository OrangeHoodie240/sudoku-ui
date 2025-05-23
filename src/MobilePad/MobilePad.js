import React, { useEffect } from 'react';
import { copySudoku } from '../helpers';
import "./MobilePad.css";
import robopad from './robo-pad.png';




const MobilePad = ({selectedCell, setPuzzleInfo, sudoku, setSudoku})=>{
    const matrix = [[1,2,3], [4,5,6], [7,8,9]];

    const pad = React.useRef(null);
    useEffect(()=>{
        let img = document.getElementById('mobile-pad-img');
        if(!img){
            img = document.createElement('img');
            img.src = robopad; 
            img.classList.add('mobile-pad');
            img.classList.add('mobile-pad-invisible');
            img.id = 'mobile-pad-img';
            document.body.append(img);

            img.addEventListener('click', (evt)=>{
                const cell = document.getElementsByClassName('selected-cell')[0];
                if(cell){
                    const rect = img.getBoundingClientRect(); 
                    const topDif = (evt.pageY - rect.y - document.documentElement.scrollTop) * 100 / rect.height;; 
                    const leftDif = (evt.pageX - rect.x - document.documentElement.scrollLeft) * 100 / rect.width; 

                    let row = -1; 
                    if(topDif >= 9.44 && topDif <= 34){
                        row = 1;
                    }
                    else if(topDif >= 36.9 && topDif <= 60){
                        row = 2;
                    }
                    else if(topDif >= 63 && topDif <= 86.3){
                        row = 3; 
                    }


                    let col = -1; 
                    if(leftDif >= 11 && leftDif <= 32){
                        col = 1;
                    }
                    else if(leftDif >= 36.7 && leftDif <= 60){
                        col = 2; 
                    }
                    else if(leftDif >= 64 && leftDif <= 87){
                        col = 3; 
                    }
        


                    if(row === -1 || col === -1) return;

                    updateCell(matrix[row-1][col-1], cell);
                }
                // pad.current.classList.add('mobile-pad-invisible'); 
            });

            document.body.addEventListener('click', (evt)=>{
                if(!window.mobilePadLastClick){
                    window.mobilePadLastClick = {x: evt.pageX, y: evt.pageY}; 
                }
                else{
                    window.mobilePadLastClick.x = evt.pageX; 
                    window.mobilePadLastClick.y = evt.pageY; 
                }
            });
        }

        pad.current = img; 
        return ()=>{
            pad.current.classList.add('mobile-pad-invisible'); 
        }
    }, []);

    useEffect(()=>{
        if(!selectedCell){
            return;
        }

        setTimeout(()=>{
            const col = +(selectedCell.getAttribute('data-col'));
            const row = +(selectedCell.getAttribute('data-row'));

            const rect = pad.current.getBoundingClientRect();
            let x = window.mobilePadLastClick.x - (col > 4 ? rect.width : 0);
            let y =  window.mobilePadLastClick.y - (row > 6 ? (rect.height + rect.height / 4) : -1 * rect.height / 4); 

            pad.current.style.top = y + 'px';
            pad.current.style.left = x + 'px';
        }, 0);


        pad.current.classList.remove('mobile-pad-invisible'); 

    }, [selectedCell]);

    function updateCell(value, cell) {
        const row = Number(cell.getAttribute('data-row'));
        const col = Number(cell.getAttribute('data-col'));

        const upperCellOfSelectedCell = cell.children[0];

        if (upperCellOfSelectedCell.innerText.trim() === value + '') {
            upperCellOfSelectedCell.innerText = '';
            sudoku[row][col] = '0';
            setSudoku(copySudoku(sudoku));
            setPuzzleInfo(puzzleInfo => ({...puzzleInfo}));
            return;
        }

        upperCellOfSelectedCell.innerText = value;
        sudoku[row][col] = value;
        setSudoku(copySudoku(sudoku));
        setPuzzleInfo(puzzleInfo => ({...puzzleInfo}));


    }
    return <></>;
};



export default MobilePad;
export {MobilePad};