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
                {location !== '/new-account' && !token ? <div className='banner-button-div'><NavLink to="/new-account">Create Account</NavLink></div> : null}
                {location !== '/login' && !token ? <div className='banner-button-div'><NavLink to="/login">Login</NavLink></div> : null}
                {location ==='/new-account' && !token ? <div className='banner-button-div'><NavLink to="/verification">Email Verification</NavLink></div> : null}
                {!!token ? <div className='banner-button-div'><NavLink to="/" onClick={signOut}>Sign Out</NavLink></div> : null}
                {location !== '/' ? <div className='banner-button-div'><NavLink to="/">Play</NavLink></div> : null}
                {location !== '/saved-puzzles' && token ? <div className='banner-button-div'><NavLink to="/saved-puzzles">Saved Puzzles</NavLink></div> : null}
                
            </div>

    </div>); 

}; 


export default Banner; 