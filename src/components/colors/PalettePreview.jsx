import React from 'react';
import './PalettePreview.scss';

const PalettePreview = ({ paletteName, colors, emoji }) => {
  const previewBoxes = colors.map(color => (
    <div
      className='preview-box'
      key={color.name}
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  return (
    <div className='palettePreview'>
      <div className='palettePreview-colors'>{previewBoxes}</div>
      <h5 className='palettePreview-title'>
        {paletteName}
        <span className='palettePreview-emoji'>{emoji}</span>
      </h5>
    </div>
  );
};

export default PalettePreview;
