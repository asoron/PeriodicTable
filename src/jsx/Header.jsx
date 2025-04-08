import React from 'react';
import '../css/Header.css';
import infinityLogo from '../assets/infinity.png';

const Header = () => {
    return (
        <header className='Header'>
            <div className='HeaderText'>
            <h3>I'am</h3>
            <h1>Asrin Yilmaz</h1>
            <h3>Developer & Maker</h3>
            </div>
            <div className='HeaderLogo'>
                <img src={infinityLogo} alt="Infinity Logo" /></div>

        </header>
    );
};

export default Header;