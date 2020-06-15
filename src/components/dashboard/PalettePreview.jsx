import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import './PalettePreview.scss';

const PalettePreview = ({
  paletteName,
  colors,
  emoji,
  handleClick,
  deletePalette
}) => {
  const previewBoxes = colors.map(color => (
    <div
      className='preview-box'
      key={color.name}
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  const handleDelete = event => {
    event.stopPropagation();
    deletePalette();
  };

  return (
    <div className='palettePreview' onClick={handleClick}>
      <div className='palettePreview-delete-button'>
        <DeleteIcon
          className='palettePreview-delete-icon'
          style={{
            transition: 'all .2s ease-in-out'
          }}
          onClick={handleDelete}
        />
      </div>
      <div className='palettePreview-colors'>{previewBoxes}</div>
      <span className='palettePreview-title'>
        {paletteName}
        <span className='palettePreview-emoji'>{emoji}</span>
      </span>
    </div>
  );
};

export default PalettePreview;
