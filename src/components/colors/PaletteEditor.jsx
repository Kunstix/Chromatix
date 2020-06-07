import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import ColorPicker from './ColorPicker';
import DragBoxList from './DragBoxList';
import Appbar from '../nav/Appbar';
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
    <div className={classes.root}>
      <Appbar
        open={open}
        classes={classes}
        palettes={palettes}
        handleSave={handleSave}
        handleDrawerOpen={handleDrawerOpen}
      />
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
          <ColorPicker
            classes={classes}
            full={full}
            addColor={addColor}
            colors={colors}
          />
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
