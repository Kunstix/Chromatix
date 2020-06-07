import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { arrayMove } from 'react-sortable-hoc';
import ColorPicker from './ColorPicker';
import DragBoxList from './DragBoxList';
import Appbar from '../nav/Appbar';
import './PaletteEditor.scss';

function PaletteEditor({ savePalette, palettes, history, maxColors = 20 }) {
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSave = paletteName => {
    const newPalette = {
      paletteName,
      colors,
      id: paletteName.toLowerCase().replace(/ /g, '-')
    };
    savePalette(newPalette);
    history.push('/');
  };

  const addColor = newColor => {
    setColors([...colors, newColor]);
  };

  const deleteColor = name => {
    setColors(colors.filter(color => color.name !== name));
  };

  const clearColors = () => {
    setColors([]);
  };

  const randomColor = () => {
    const allColors = palettes.map(palette => palette.colors).flat();
    const random = Math.floor(Math.random() * allColors.length);
    setColors([...colors, allColors[random]]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const full = colors.length >= maxColors;

  return (
    <div className='root'>
      <Appbar
        open={open}
        palettes={palettes}
        handleSave={handleSave}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className='drawer'
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: 'drawer-paper'
        }}
      >
        <div className='drawer-header'>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className='editor-container'>
          <Typography
            variant='h5'
            style={{ fontFamily: 'Roboto Mono', fontSize: '20px' }}
          >
            Design your palette
          </Typography>
          <ColorPicker full={full} addColor={addColor} colors={colors} />
          <div className='editor-buttons'>
            <Button
              variant='contained'
              className='button-blue'
              onClick={randomColor}
              disabled={full}
            >
              {full ? 'Full Palette' : 'Random Color'}
            </Button>
            <Button
              className='button-dark'
              variant='contained'
              onClick={clearColors}
            >
              Clear Palette
            </Button>
          </div>
          <Divider />
        </div>
      </Drawer>
      <main className={`content ${open && 'content-shift'}`}>
        <div className='drawer-header plain-css-mui-toolbar-mixin' />
        <DragBoxList
          colors={colors}
          deleteColor={deleteColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default PaletteEditor;
