import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './PaletteSaveForm.scss';

const PaletteSaveForm = ({ palettes, handleSave }) => {
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='paletteSaveForm'>
      <Button size='small' variant='contained' onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
        <ValidatorForm
          className='save-form'
          onSubmit={() => handleSave(paletteName)}
        >
          <DialogContent>
            <TextValidator
              size='small'
              fullWidth
              label='New Palette Name'
              margin='normal'
              variant='filled'
              value={paletteName}
              onChange={handleChangePaletteName}
              validators={['required', 'isPaletteUnique']}
              errorMessages={[
                'Every palette needs a name.',
                'Palettename is already taken.'
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' className='button-dark'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteSaveForm;
