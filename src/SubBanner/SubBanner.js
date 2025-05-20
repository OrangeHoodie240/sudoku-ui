import React from 'react';
import './SubBanner.css';



function SubBanner({puzzleInfo, header}){
    const token = localStorage.getItem('token'); 

    

    async function onSavePuzzle(evt) {
        const puzzle = puzzleInfo.puzzle;
        const level = puzzleInfo.level;
        const puzzleId = puzzleInfo.puzzleId;
        const id = localStorage.getItem('id');
        const lastActiveSavedPuzzleId = +(localStorage.getItem('last-active-saved-puzzle-id'));
        const method = lastActiveSavedPuzzleId === puzzleId ? 'PATCH' : 'POST'; 
        const url = 'http://127.0.0.1:5000/saved-puzzles';
        const obj = {
            headers: { 'Content-Type': 'application/json' },
            method,
            body: JSON.stringify({ puzzle, level, puzzleId, token, id })
        };

        const resp = await fetch(url, obj)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error: Status', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

        if(resp?.success && method === 'POST'){
            localStorage.setItem('last-active-saved-puzzle-id', puzzleId);
        }

    }
    return (
        <div className='sub-banner'>
            <h2 className="sub-banner-header bungee-shade-regular">{header}</h2>

            {puzzleInfo && token ? <div className="sub-banner-buttons-div"> 
                <button onClick={onSavePuzzle}>Save Puzzle</button>
            </div>
            : null }
        </div>
    );

}



export default SubBanner; 
export {SubBanner}; 