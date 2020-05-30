import React from 'react';
import Palette from './components/colors/Palette';
import { generatePalette } from './helpers/colors';
import seedColors from './seedColors';

function App() {
  return <Palette palette={generatePalette(seedColors[1])} />;
}

export default App;
