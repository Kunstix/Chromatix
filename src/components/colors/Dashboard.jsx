import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PalettePreview from './PalettePreview';
import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <h1>Chromatix</h1>
        {palettes.map((palette, index) => (
          <Link key={index} to={`/palette/${palette.id}`}>
            <PalettePreview {...palette} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Dashboard;
