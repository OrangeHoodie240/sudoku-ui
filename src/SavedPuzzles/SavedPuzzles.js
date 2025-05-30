import React, { useEffect } from "react";
import { convertDBPuzzle } from "../helpers";
import { useNavigate } from "react-router-dom";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import './SavedPuzzles.css';

const SavedPuzzles = ({ setPuzzleInfo, puzzleInfo}) => {
    const [savedPuzzles, setSavedPuzzles] = React.useState([]);
    const navigate = useNavigate();


    React.useEffect(() => {
        async function loadSavedPuzzles() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const url = 'https://sudoku-api-nine.vercel.app/saved-puzzles/' + id + '?token=' + token;

            let resp = await fetch(url)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error Status', resp.status);
                    }
                    return resp.json();
                })
                .then(data => data)
                .catch(err => console.error(err));


            resp.puzzles.sort((a,b)=>{
                a = a.updated && a.created ? a.updated : a.created;
                a = new Date(a);
                b = b.updated && b.created ? b.updated : b.created;
                b = new Date(b);
                return b - a;
            });
            setSavedPuzzles(resp.puzzles);
        }
        loadSavedPuzzles();
    }, []);


    async function onLoadPuzzle({ target }) {
        target = target.parentElement;
        const level = target.getAttribute('data-level');
        let puzzle = target.getAttribute('data-puzzle');
        let notes; 
        [puzzle, notes] = convertDBPuzzle(puzzle);
        const puzzleId = +(target.getAttribute('data-puzzle-id'));
        localStorage.setItem('last-active-saved-puzzle-id', puzzleId);
        
        setPuzzleInfo(p => ({ level, puzzle, puzzleId, notes }));
        navigate('/');
    }


    async function onDeletePuzzle({ target }) {
        target = target.parentElement;
        const level = target.getAttribute('data-level');
        const puzzleId = target.getAttribute('data-puzzle-id');

        const url = 'https://sudoku-api-nine.vercel.app/saved-puzzles';
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const lastActiveSavedPuzzleId = localStorage.getItem('last-active-saved-puzzle-id'); 
        if(puzzleId === lastActiveSavedPuzzleId){
            localStorage.removeItem('last-active-saved-puzzle-id');
        }
        const settings = {
            method: 'DELETE',
            body: JSON.stringify({ token, id, level, puzzleId }),
            headers: { 'Content-Type': 'application/json' }
        };

        await fetch(url, settings)
            .then(resp => {
                if (!resp.ok()) {
                    throw new Error("Error Status: ", resp.status);
                }
                return resp.json();
            })
            .then(data => data)
            .catch(err => console.error(err));


        let resp = await fetch(url + '/' + id + '?token=' + token)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error Status', resp.status);
                }
                return resp.json();
            })
            .then(data => data)
            .catch(err => console.error(err));
        setSavedPuzzles(resp.puzzles);
    }



    const puzzleList = savedPuzzles.map(puzzle => {
        const {puzzleCells, puzzleNotes} = JSON.parse(puzzle.puzzle); 
        let created = new Date(puzzle.created); 
        created = `${created.getFullYear()}/${created.getMonth() + 1}/${created.getDate()}`;
        
        let updated = puzzle.updated ? new Date(puzzle.updated) : null; 
        if(updated){
            updated = `${updated.getFullYear()}/${updated.getMonth() + 1}/${updated.getDate()}`;
        }


        return (
        <li className="saved-puzzles-li" data-level={puzzle.level} data-puzzle={puzzle.puzzle} data-puzzle-id={puzzle.puzzle_id}>Puzzle Level {puzzle.level} <button onClick={onLoadPuzzle}>Load</button> <button onClick={onDeletePuzzle}>Delete</button>
                <p>
                    <span>Save Created: {created}</span> &nbsp;  &nbsp;
                    {updated ? <span>Saved Last:{updated}</span> : null}
                
                </p> 
                
                <div style={{marginTop: '10px'}}>
                    <SudokuGrid puzzleInfo={{puzzle: puzzleCells, notes: puzzleNotes}} />
                </div>
            
        </li>);
    });

    return (<div id='saved-puzzles'>
        <h2>Saved Puzzles</h2>
        {(savedPuzzles) ? <ul>{puzzleList}</ul> : <p>No puzzles saved</p>}
    </div>);
};


export default SavedPuzzles;