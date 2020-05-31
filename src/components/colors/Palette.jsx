import React, { Component } from 'react';
import Navbar from '../nav/Navbar';
import ColorBox from './ColorBox';
import Footer from '../nav/Footer';
import './Palette.scss';

class Palette extends Component {
  state = { level: 500, format: 'hex' };

  changeColorLevel(level) {
    this.setState({ level });
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox key={color.name} name={color.name} bg={color[format]} />
    ));

    return (
      <div className='Palette'>
        <Navbar
          level={level}
          changeLevel={level => this.changeColorLevel(level)}
          changeFormat={format => this.changeFormat(format)}
        />
        <div className='Palette-colors'>{colorBoxes}</div>
        <Footer name={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;
