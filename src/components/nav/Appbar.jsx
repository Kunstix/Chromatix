import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import PaletteSaveForm from '../colors/PaletteSaveForm';
import './Appbar.scss';

const Appbar = ({ open, palettes, handleSave, handleDrawerOpen }) => {
  return (
    <div className='Appbar'>
      <CssBaseline />
      <AppBar
        color='default'
        position='fixed'
        size='small'
        className={`appBar ${open && 'appBar-shift'}`}
      >
        <Toolbar className='toolBar'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={`menu-button ${open && 'hide'}`}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>CHROMATIX</Link>
          <PaletteSaveForm palettes={palettes} handleSave={handleSave} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
