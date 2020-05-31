import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PalettePreview from './PalettePreview';
import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div className='Dashboard'>
        <div className='palettes-container'>
          <nav className='palettes-nav'>
            <h5>Chromatix</h5>
          </nav>
          <div className='palettes-board'>
            {palettes.map((palette, index) => (
              <Link key={index} to={`/palette/${palette.id}`}>
                <PalettePreview {...palette} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
