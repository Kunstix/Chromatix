import React from 'react';
import Palette from './components/colors/Palette';
import Dashboard from './components/colors/Dashboard';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './helpers/colors';
import seedColors from './seedColors';

const App = () => {
  const findPalette = id => {
    return seedColors.find(palette => palette.id === id);
  };

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <Dashboard palettes={seedColors} />}
      />
      <Route
        exact
        path='/palette/:id'
        render={({ match }) => (
          <Palette palette={generatePalette(findPalette(match.params.id))} />
        )}
      />
    </Switch>
  );
};

// <Palette palette={generatePalette(seedColors[1])} />;

export default App;
