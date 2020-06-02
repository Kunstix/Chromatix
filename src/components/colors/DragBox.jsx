import React from 'react';
import './DragBox.scss';

const DragBox = ({ name, color }) => {
  return (
    <div className='DragBox' style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default DragBox;
