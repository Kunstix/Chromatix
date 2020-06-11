import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import './PaletteSaveForm.scss';

const PaletteSaveForm = ({ palettes, handleSave }) => {
  const [stage, setStage] = useState('closed');
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
    setStage('name');
  };

  const handleClose = () => {
    setStage('closed');
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = emoji => {
    handleSave({ paletteName, emoji: emoji.native });
  };

  return (
    <div className='paletteSaveForm'>
      <Button size='small' variant='contained' onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog open={stage === 'emoji'}>
        <Picker onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === 'name'}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
        <ValidatorForm className='save-form' onSubmit={() => showEmojiPicker()}>
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
