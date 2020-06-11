import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PalettePreview from './PalettePreview';
import './Dashboard.scss';

class Dashboard extends Component {
  renderPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes } = this.props;
    return (
      <div className='Dashboard'>
        <div className='palettes-container'>
          <nav className='palettes-nav'>
            <h3>CHROMATIX</h3>
            <Link className='bubbly-button' to='/palette/new'>
              Create Palette
            </Link>
          </nav>
          <div className='palettes-board'>
            {palettes.map(palette => (
              <PalettePreview
                key={palette.id}
                {...palette}
                handleClick={() => this.renderPalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
