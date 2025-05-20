import './Banner.css';
import botImg from './bot.png'
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Banner = ()=>{

    const location = useLocation().pathname;
    const token = localStorage.getItem('token');

     const [_, setRerenderState] = React.useState(false);

    function signOut(){
        localStorage.removeItem('token'); 
        setRerenderState(x => !x);
    }

    return (<div className="banner">
            <h1 className="banner-header bungee-shade-regular">Cyber Sudoku</h1>
            <img className="banner-image" src={botImg} />
            <div className='banner-button-div'>
                {location !== '/new-account' && !token ? <NavLink to="/new-account">Create Account</NavLink> : null}
            </div>
            <div className='banner-button-div'>
                {location !== '/login' && !token ? <NavLink to="/login">Login</NavLink> : null}
            </div>
            <div className='banner-button-div'>
                {!!token ? <NavLink to="/" onClick={signOut}>Sign Out</NavLink> : null}
            </div>
    </div>); 

}; 


export default Banner; 