import React from 'react';
import botwave from './botwave.png';
import './BoardBackground.css';


const BoardBackground = (props)=>{
    return (
        <div className="board-background">
            <img src={botwave} className="board-background-img" />
            <div className='board-background-white-screen'>
                {props.children}
            </div>
        </div>
    );
};


export default BoardBackground; 
export {BoardBackground};