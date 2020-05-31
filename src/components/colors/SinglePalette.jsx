import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import ColorBox from './ColorBox';
import Footer from '../nav/Footer';
import './SinglePalette.scss';

class SinglePalette extends Component {
  state = { format: 'hex' };

  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colorId);
  }

  getShades(palette, colorToFilterBy) {
    const shades = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades.push(allColors[key].find(color => color.id === colorToFilterBy));
    }
    return shades.slice(1);
  }

  changeFormat(newFormat) {
    this.setState({ format: newFormat });
  }
  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        bg={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className='SinglePalette Palette'>
        <Navbar
          changeFormat={format => this.changeFormat(format)}
          showAllColors={false}
        />
        <div className='Palette-colors'>
          {colorBoxes}
          <div className='go-back-button'>
            <Link to={`/palette/${id}`}>Back to Palette</Link>
          </div>
        </div>
        <Footer name={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default SinglePalette;
