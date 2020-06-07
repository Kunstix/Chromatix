import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './ColorPicker.scss';

const ColorPicker = ({ full, addColor, colors }) => {
  const [selectedColor, setSelectedColor] = useState('teal');
  const [newColorName, setNewColorName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isNameUnique', newName => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== newName.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', value => {
      return colors.every(({ color }) => color !== selectedColor);
    });
  }, [colors, selectedColor]);

  const handleSelectedColor = newColor => {
    setSelectedColor(newColor.hex);
  };

  const handleChangeColorName = event => {
    setNewColorName(event.target.value);
  };

  const handleAddColor = () => {
    const newColor = {
      color: selectedColor,
      name: newColorName
    };
    addColor(newColor);
    setNewColorName('');
  };

  return (
    <div className='ColorPicker'>
      <ChromePicker
        color={selectedColor}
        onChangeComplete={handleSelectedColor}
      />
      <ValidatorForm onSubmit={handleAddColor} className='color-form'>
        <TextValidator
          size='small'
          variant='outlined'
          label='Color Name'
          value={newColorName}
          onChange={handleChangeColorName}
          validators={['required', 'isNameUnique', 'isColorUnique']}
          errorMessages={[
            'Every color needs a name.',
            'Name is already taken.',
            'Color value already added.'
          ]}
        />
        <Button
          type='submit'
          variant='contained'
          style={{
            backgroundColor: full ? 'grey' : selectedColor,
            color: 'white'
          }}
          disabled={full}
        >
          {full ? 'Full Palette' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPicker;
