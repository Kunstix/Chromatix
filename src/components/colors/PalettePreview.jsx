import React from 'react';
import './PalettePreview.scss';

const PalettePreview = ({ paletteName, colors, emoji, handleClick }) => {
  const previewBoxes = colors.map(color => (
    <div
      className='preview-box'
      key={color.name}
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  return (
    <div className='palettePreview' onClick={handleClick}>
      <div className='palettePreview-colors'>{previewBoxes}</div>
      <span className='palettePreview-title'>
        {paletteName}
        <span className='palettePreview-emoji'>{emoji}</span>
      </span>
    </div>
  );
};

export default PalettePreview;
