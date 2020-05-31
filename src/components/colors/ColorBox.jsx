import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.scss';

class ColorBox extends Component {
  state = { copied: false };

  toggleCopy() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, bg, paletteId, colorId, showLink } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={bg} onCopy={() => this.toggleCopy()}>
        <div className='ColorBox' style={{ backgroundColor: bg }}>
          <div
            className={`copy-overlay ${copied && 'show'}`}
            style={{ backgroundColor: bg }}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>COPIED!</h1>
            <p>{bg}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
              <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={event => event.stopPropagation()}
            >
              <span className='more'>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
