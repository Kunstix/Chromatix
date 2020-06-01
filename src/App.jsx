import React from 'react';
import Palette from './components/colors/Palette';
import Dashboard from './components/colors/Dashboard';
import SinglePalette from './components/colors/SinglePalette';
import PaletteEditor from './components/colors/PaletteEditor';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './helpers/colors';
import seedColors from './seedColors';

const App = () => {
  const findPalette = id => {
    return seedColors.find(palette => palette.id === id);
  };

  return (
    <Switch>
      <Route exact path='/palette/new' render={() => <PaletteEditor />} />
      <Route
        exact
        path='/'
        render={routeProps => (
          <Dashboard palettes={seedColors} {...routeProps} />
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
