import React, { Component } from 'react';
import Palette from './components/Palette';
import seedColors from './seedColors';

function App() {
  return <Palette {...seedColors[1]} />;
}

export default App;
