import React, { Component } from 'react';
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.scss';

class ColorBox extends Component {
  state = { copied: false };

  constructor(props) {
    super(props);
    this.isDark = chroma(props.bg).luminance() <= 0.2;
    this.isLight = chroma(props.bg).luminance() >= 0.6;
  }

  toggleCopy() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  renderCopyButton() {
    return (
      <div className='copy-container'>
        <div className='box-content'>
          <span className={`${this.isDark && 'white-text'}`}>
            {this.props.name}
          </span>
        </div>
        <button className={`copy-button ${this.isLight && 'grey-text'}`}>
          Copy
        </button>
      </div>
    );
  }

  renderCopyOverlay() {
    const { bg } = this.props;
    return (
      <div>
        <div
          className={`copy-overlay ${this.state.copied && 'show'}`}
          style={{ backgroundColor: bg }}
        />
        <div className={`copy-msg ${this.state.copied && 'show'}`}>
          <h1>COPIED!</h1>
          <p className={`${this.isLight && 'black-text'}`}>{bg}</p>
        </div>
      </div>
    );
  }

  renderMore() {
    return (
      <Link
        to={`/palette/${this.props.paletteId}/${this.props.colorId}`}
        onClick={event => event.stopPropagation()}
      >
        <span className={`more ${this.isLight ? 'grey' : 'white'}-text`}>
          MORE
        </span>
      </Link>
    );
  }
  render() {
    const { bg, showLink } = this.props;
    return (
      <CopyToClipboard text={bg} onCopy={() => this.toggleCopy()}>
        <div className='ColorBox' style={{ backgroundColor: bg }}>
          {this.renderCopyOverlay()}
          {this.renderCopyButton()}
          {showLink && this.renderMore()}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
