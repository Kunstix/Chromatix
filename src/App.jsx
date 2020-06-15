import React, { useState, useEffect } from 'react';
import Palette from './components/palettes/Palette';
import Dashboard from './components/dashboard/Dashboard';
import SinglePalette from './components/palettes/SinglePalette';
import PaletteEditor from './components/editor/PaletteEditor';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './helpers/colors';
import seedColors from './helpers/seedColors';
import './App.scss';

const App = () => {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
    console.log(palettes);
  };

  useEffect(syncLocalStorage, [palettes]);

  const findPalette = id => {
    return palettes.find(palette => palette.id === id);
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = id => {
    console.log(id);
    setPalettes(palettes.filter(palette => palette.id !== id));
  };

  return (
    <Switch>
      <Route
        exact
        path='/palette/new'
        render={routeProps => (
          <PaletteEditor
            savePalette={savePalette}
            palettes={palettes}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path='/'
        render={routeProps => (
          <Dashboard
            palettes={palettes}
            {...routeProps}
            deletePalette={deletePalette}
          />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId'
        render={({ match }) => (
          <Palette
            palette={generatePalette(findPalette(match.params.paletteId))}
          />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={({ match }) => (
          <SinglePalette
            palette={generatePalette(findPalette(match.params.paletteId))}
            colorId={match.params.colorId}
          />
        )}
      />
    </Switch>
  );
};

// <Palette palette={generatePalette(seedColors[1])} />;

export default App;
