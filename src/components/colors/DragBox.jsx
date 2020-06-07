import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import './DragBox.scss';

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

export default SortableElement(DragBox);
