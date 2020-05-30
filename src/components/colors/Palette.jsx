import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

export default class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox name={color.name} bg={color.color} />
    ));

    return (
      <div className='Palette'>
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
    );
  }
}
