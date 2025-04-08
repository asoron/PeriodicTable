/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../css/Navigator.css';
import infinityLogo from '../assets/infinity.png';

const Navigator = () => {
  return (
    <nav className="navigator">
      <div><a href="#">About</a></div>
      <div><a href="#">Ep2</a></div>
      <div><img src={infinityLogo} alt="Infinity Logo" /></div>
      <div><a href="#">Ep3</a></div>
      <div><a href="#">Ep4</a></div>
    </nav>
  );
};

export default Navigator;
