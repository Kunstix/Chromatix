import React from 'react';
import './DragBox.scss';
import DeleteIcon from '@material-ui/icons/DeleteSharp';

const DragBox = ({ name, color, deleteColor }) => {
  return (
    <div className='dragbox' style={{ backgroundColor: color }}>
      <div className='dragbox-content'>
        <span> {name}</span>
        <DeleteIcon className='delete-icon' onClick={deleteColor} />
      </div>
    </div>
  );
};

export default DragBox;
