import React from 'react';
import './Footer.css';

const Footer = ({ name, emoji }) => (
  <div className='Footer'>
    {name}
    <span className='emoji'>{emoji}</span>
  </div>
);

export default Footer;
