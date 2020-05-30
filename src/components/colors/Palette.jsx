import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

export default class Palette extends Component {
  state = { level: 500 };

  changeColorLevel(level) {
    this.setState({ level });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox key={color.name} name={color.name} bg={color.hex} />
    ));

    return (
      <div className='Palette'>
        <div className='Slider'>
          <Slider
            defaultValue={500}
            min={100}
            max={900}
            step={100}
            onAfterChange={level => this.changeColorLevel(level)}
          />
        </div>
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
    );
  }
}
