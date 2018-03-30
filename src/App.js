import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './custom.css';
import Treemap from './components/Treemap';
import Mustache from 'mustache';

function toType(uri) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}

function renderTile(node) {
  if (node.data && node.data.info) {
    node.data.info.type = toType(node.data.info.type);
    node.data.info.width = `${node.data.info.score * 100}px`;
  }

  return Mustache.render(
    `
        {{#info}}
        <div class="tile">
          <a href="/wp-admin/admin-ajax.php?action=wl_locate&uri={{itemId}}" class="tile__label">{{label}}</a>
          <div class="tile__type">{{type}}</div>
          <div class="tile__score" style="width: {{width}};">{{score}}</div>
        </div>
        {{/info}}
        {{^info}}{{name}}{{/info}}
    `,
    node.data
  );
}

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
        <Treemap
          url="complete.json"
          width="1350"
          height="500"
          minTileWidth="150"
          minTileHeight="100"
          tileRenderCallback={renderTile}
        />
      </div>
    );
  }
}

export default App;
