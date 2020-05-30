import React, { Component } from 'react';
import Navbar from '../nav/Navbar';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
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
        <Navbar
          level={level}
          changeLevel={level => this.changeColorLevel(level)}
        />
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
