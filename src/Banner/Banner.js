import './Banner.css';
import botImg from './bot2.png'
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Banner = ({setRerenderState})=>{

    const location = useLocation().pathname;
    const token = localStorage.getItem('token');


    function signOut(){
        localStorage.removeItem('token'); 
        localStorage.removeItem('id'); 
        setRerenderState(x => !x);
    }

    return (<div className="banner">
            <h1 className="banner-header bungee-shade-regular banner-header">Cyber Sudoku</h1>
            <img className="banner-image" src={botImg} />
            <div className='banner-buttons-div'>
                <div className='banner-button-div'>
                    {location !== '/new-account' && !token ? <NavLink to="/new-account">Create Account</NavLink> : null}
                </div>
                <div className='banner-button-div'>
                    {location !== '/login' && !token ? <NavLink to="/login">Login</NavLink> : null}
                </div>
                <div className='banner-button-div'>
                    {!!token ? <NavLink to="/" onClick={signOut}>Sign Out</NavLink> : null}
                </div>
                <div className='banner-button-div'>
                    {location !== '/play' ? <NavLink to="/">Play</NavLink> : null}
                </div>
                <div className='banner-button-div'>
                    {location !== '/saved-puzzles' ? <NavLink to="/saved-puzzles">Saved Puzzles</NavLink> : null}
                </div>
                
            </div>

    </div>); 

}; 


export default Banner; 