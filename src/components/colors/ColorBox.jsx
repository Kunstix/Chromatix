import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default class ColorBox extends Component {
  render() {
    const { name, bg } = this.props;

    return (
      <CopyToClipboard text={bg}>
        <div style={{ backgroundColor: bg }} className='ColorBox'>
          <div className='copy-container'>
            <div className='box-content'>
              <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
          </div>
          <span className='more'>MORE</span>
        </div>
      </CopyToClipboard>
    );
  }
}
