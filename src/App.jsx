import React from 'react';
import Palette from './components/colors/Palette';
import seedColors from './seedColors';

function App() {
  return <Palette {...seedColors[1]} />;
}

export default App;
