import React, { useEffect, useState } from "react";
import { flattenPuzzle } from "../helpers";
import './HintBox.css';
import detbot from './holmes.png';
import hint from './hint.png'; 
import TutorialModal from "../TutorialModal/TutorialModal";

const HintBox = ({ setSelectedCell, setHintCell, selectedCell, hintCell, sudoku }) => {
    const [hintMessage, setHintMessage] = useState(null);
    const [hintValue, setHintValue] = useState(null);
    const [display, setDisplay] = React.useState(false);
    const [showTutorialModal, setShowTutorialModal] = React.useState(false);    
    const [selectedStrategy, setSelectedStrategy] = React.useState('');

    const magnifiedCell = React.useRef(null);
    const hintButton = React.useRef(null);
    const difficultySettings = React.useRef(null);


    useEffect(()=>{
        magnifiedCell.current = document.querySelector('.sudoku-board-magnified-cell'); 
        hintButton.current = document.querySelector('#hint-button');
        difficultySettings.current = document.querySelector('.difficulty-selector')
    }, []);

    useEffect(()=>{
        if(display && hintCell !== selectedCell){
            closeModal(); 
        }
    }, [selectedCell]);



    async function getHint(evt) {
        if(!display){
            magnifiedCell.current.style.display = 'none'; 
            hintButton.current.style.display = 'none';
            difficultySettings.current.style.display = 'none'; 

            const flatPuzzle = flattenPuzzle(sudoku);
            const url = 'https://sudoku-api-nine.vercel.app/sudoku/analysis?puzzle=' + flatPuzzle;
            const data = await fetch(url)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error! Status:', resp.status);
                    }
                    return resp.json();
                })
                .then(data => {
                    return data;
                })
                .catch(err => console.error(err));
            if (data) {
                const { position, value, solveWith } = data.data;

                const cellId = '#sudoku-cell-' + (position[0] - 1) + '-' + (position[1] - 1);
                const cell = document.querySelector(cellId);



                cell.classList.add('hintCell');
                setHintCell(cell);
                if (selectedCell) {
                    selectedCell.classList.remove('selected-cell');
                }
                setSelectedCell(cell);

                document.querySelector('#sudoku-pad-values').focus();

                let message = 'The green cell can be solved by ';
                message += solveWith.length > 1 ? 'combining ' : 'using '; 

                setHintMessage({message, strategies: solveWith});
                setHintValue(value);
                setDisplay(true);
            }   
        }
        else{
            document.querySelector('#solution').innerText = '';
        }
        

        if (hintCell) {
            hintCell.classList.remove('hintCell');
            setHintCell(null);
            return;
        }
    }

    function viewSolution(evt) {
        const solution = document.querySelector('#solution');
        solution.innerText = hintValue;
        const pad = document.querySelector('.sudoku-pad-values');
        if (pad) {
            pad.focus();
        }
    }

    function closeModal(evt){
        const target = evt?.target || document.querySelector('.hint-modal-button'); 
        magnifiedCell.current.style.display = 'block'; 
        hintButton.current.style.display = 'block';
        difficultySettings.current.style.display = 'inline-block'; 
        target.parentElement.classList.remove('hint-modal');
        target.parentElement.classList.add('hint-modal-invisible');
        setDisplay(false);
        getHint();
    }


    let strategyButtons = null;
    if(hintMessage?.strategies){
        strategyButtons = hintMessage?.strategies.map(strategy => {
                const onClick = ()=>{
                    setSelectedStrategy(strategy);
                    setShowTutorialModal(strategy);
                };
                let strategyText = strategy.replace(/-/g, ' ');
                strategyText = strategyText.replace(/{.*}/g, "");
                return <a key={`strategy-button-${strategy}`} className='hint-message-strategy-button' onClick={onClick}>{strategyText}</a>;
            });
    }

    return (
        <div className="hint-box">
            {showTutorialModal ? <TutorialModal strategy={selectedStrategy} setShowTutorialModal={setShowTutorialModal} /> : null}
            <img onClick={getHint} id='hint-button' src={hint} />
            <div className={display ? 'hint-modal' : 'hint-modal-invisible'}>
                <div className="hint-modal-button" onClick={closeModal}>X</div>
                <img className="hint-modal-img" src={detbot} />
                <div className="hint-content">
                    <p>{hintMessage?.message}</p>
                    {strategyButtons}
                    <br />
                    <button onClick={viewSolution} className='hint-solution-button'>See Solution</button>
                    <span id='solution'></span>
                </div>

            </div>

        </div>
    );

};










export default HintBox;