import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const Appbar = ({ open, palettes, handleSave, handleDrawerOpen }) => {
  const [paletteName, setPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteUnique', value => {
      return palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLocaleLowerCase()
      );
    });
  }, [palettes, paletteName]);

  const handleChangePaletteName = event => {
    setPaletteName(event.target.value);
  };

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
          <ValidatorForm
            className='save-form'
            onSubmit={() => handleSave(paletteName)}
          >
            <TextValidator
              size='small'
              variant='outlined'
              label='Palette Name'
              value={paletteName}
              onChange={handleChangePaletteName}
              validators={['required', 'isPaletteUnique']}
              errorMessages={[
                'Every palette needs a name.',
                'Palettename is already taken.'
              ]}
            />
            <Button type='submit' variant='contained' className='button-dark'>
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
