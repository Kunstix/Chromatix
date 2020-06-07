import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import DragBoxList from './DragBoxList';
import './PaletteEditor.scss';

const drawerWidth = 380;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  buttonBlue: {
    backgroundColor: 'steelblue',
    fontFamily: 'Roboto Mono',
    color: 'white'
  },
  buttonDark: {
    backgroundColor: 'lightcoral',
    fontFamily: 'Roboto Mono',
    fontWeight: '400',
    color: 'white'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    fontFamily: 'Roboto Mono',
    backgroundColor: 'default'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  saveForm: {
    display: 'flex',
    alignItems: 'center'
  },
  colorForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function PaletteEditor({ savePalette, palettes, history, maxColors = 20 }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState('teal');
  const [newColorName, setNewColorName] = useState('');
  const [colors, setColors] = useState(palettes[0].colors);
  const [paletteName, setPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isNameUnique', newName => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== newName.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', value => {
      return colors.every(({ color }) => color !== selectedColor);
    });
    ValidatorForm.addValidationRule('isPaletteUnique', value => {
      return palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLocaleLowerCase()
      );
    });
  }, [colors, selectedColor, palettes, paletteName]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelectedColor = newColor => {
    setSelectedColor(newColor.hex);
  };

  const handleChangeColorName = event => {
    setNewColorName(event.target.value);
  };

  const handleChangePaletteName = event => {
    setPaletteName(event.target.value);
  };

  const handleSave = () => {
    const newPalette = {
      paletteName,
      colors,
      id: paletteName.toLowerCase().replace(/ /g, '-')
    };
    savePalette(newPalette);
    history.push('/');
  };

  const addColor = () => {
    const newColor = { color: selectedColor, name: newColorName };
    setColors([...colors, newColor]);
    setNewColorName('');
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
    <div className={classes.root}>
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
            CHROMATIX
          </Typography>
          <ValidatorForm
            className={clsx(classes.saveForm)}
            onSubmit={handleSave}
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
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
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
          <ChromePicker
            color={selectedColor}
            onChangeComplete={handleSelectedColor}
          />
          <ValidatorForm onSubmit={addColor} className={classes.colorForm}>
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
              className={classes.buttonBlue}
              style={{ backgroundColor: full ? 'grey' : selectedColor }}
              disabled={full}
            >
              {full ? 'Full Palette' : 'Add Color'}
            </Button>
          </ValidatorForm>
          <div className='editor-buttons'>
            <Button
              variant='contained'
              className={classes.buttonBlue}
              onClick={randomColor}
              disabled={full}
            >
              {full ? 'Full Palette' : 'Random Color'}
            </Button>
            <Button
              className={classes.buttonDark}
              variant='contained'
              onClick={clearColors}
            >
              Clear Palette
            </Button>
          </div>
        </div>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
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
