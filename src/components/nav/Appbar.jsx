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

const Appbar = ({ classes, open, palettes, handleSave, handleDrawerOpen }) => {
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
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={clsx(classes.toolBar)}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            style={{ fontFamily: 'Roboto Mono', fontWeight: '400' }}
          >
            <Link to='/'>CHROMATIX</Link>
          </Typography>
          <ValidatorForm
            className={clsx(classes.saveForm)}
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
            <Button
              type='submit'
              variant='contained'
              className={classes.buttonDark}
            >
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
