import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Treemap from './components/Treemap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Treemap url="complete.json" width="1350" height="500" minTileWidth="150" minTileHeight="100" />
      </div>
    );
  }
}

export default App;
