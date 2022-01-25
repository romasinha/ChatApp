import React from 'react'
import './InfoBar.css'

const InfoBar = () => {
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='online image'/>
            <h3>roomName</h3>
        </div>
        <div className='rightInnerContainer'>
             <a href='/'><img src={closeIcon} alt='close image'></img></a>
        </div>
    </div>
}

export default InfoBar
