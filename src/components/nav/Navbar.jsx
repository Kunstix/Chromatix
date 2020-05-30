import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  state = { format: 'hex', open: false };

  changeFormat(event) {
    this.setState({ format: event.target.value });
    this.props.changeFormat(event.target.value);
    this.setState({ open: true });
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format, open } = this.state;
    return (
      <header className='Navbar'>
        <div className='logo'>
          <a href='/'>Chromatix</a>
        </div>
        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='Slider'>
            <Slider
              defaultValue={500}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className='select-container'>
          <Select value={format} onChange={event => this.changeFormat(event)}>
            <MenuItem value='hex'>HEX - #000000</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(0, 0, 0, 0)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(0, 0, 0, 0, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format Changed To {format.toLocaleUpperCase()}
            </span>
          }
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={() => this.closeSnackbar()}
          action={[
            <IconButton
              onClick={() => this.closeSnackbar()}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        ></Snackbar>
      </header>
    );
  }
}

export default Navbar;
