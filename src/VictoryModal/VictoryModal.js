import React, { useEffect } from 'react';
import './VictoryModal.css';
import vicbot from './vicbot.png';



const VictoryModal = ({setShowVictory, selectPuzzle, puzzleInfo})=>{
    const background = React.useRef(null); 
    
    useEffect(()=>
    {
        const div = document.createElement('div'); 
        div.classList.add('victory-modal-background');
        document.body.append(div);
        background.current = div; 
        return ()=>{
            background.current.remove(); 
        };
    }, []);
    
    async function onClick(){
        await selectPuzzle({target: {value: puzzleInfo.level}})
        setShowVictory(x=>!x);
       
    }

    return (
        <>
        <div className="victory-modal">
            <h3>You Win!</h3>
            <img src={vicbot} />
            <div className='victory-modal-bottom bungee-shade-regular'>
                <p className='victory-modal-button' onClick={onClick}>Play Again?</p>
            </div>
        </div>
        </>

    );

};


export default VictoryModal;
export {VictoryModal};