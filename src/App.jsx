import React from 'react';
import Palette from './components/colors/Palette';
import { generatePalette } from './helpers/colors';
import seedColors from './seedColors';

function App() {
  console.log(generatePalette(seedColors[1]));
  return <Palette {...seedColors[1]} />;
}

export default App;
