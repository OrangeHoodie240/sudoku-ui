import React from 'react';
import './SubBanner.css';



function SubBanner(props){
    return (
        <div className='sub-banner'>
            <h2 className="sub-banner-header bungee-shade-regular">{props.header}</h2>
        </div>
    );

}



export default SubBanner; 
export {SubBanner}; 