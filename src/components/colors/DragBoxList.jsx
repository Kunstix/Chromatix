import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DragBox from './DragBox';
import './DragBoxList.scss';

const DragBoxList = ({ colors, deleteColor }) => {
  return (
    <div className='dragboxList'>
      {colors.map((color, index) => (
        <DragBox
          index={index}
          key={color.name}
          name={color.name}
          color={color.color}
          deleteColor={() => deleteColor(color.name)}
        />
      ))}
    </div>
  );
};

export default SortableContainer(DragBoxList);
