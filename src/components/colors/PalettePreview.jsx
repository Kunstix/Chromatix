import React from 'react';
import './PalettePreview.scss';

const PalettePreview = ({ classes, paletteName, emoji }) => (
  <div className='PalettePreview'>
    <div className='palettePreview-colors'></div>
    <h5 className='palettePreview-title'>
      {paletteName}
      <span className='palettePreview-emoji'>{emoji}</span>
    </h5>
  </div>
);

export default PalettePreview;
