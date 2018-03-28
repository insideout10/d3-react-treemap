import React, { Component } from 'react';
import { treemapSquarify } from 'd3-hierarchy';
import TreemapAdapter from './TreemapAdapter';
import TilingStrategy from './TilingStrategy';
import RenderStrategy from './RenderStrategy';

class Treemap extends Component {
  componentDidMount() {
    const adapter = new TreemapAdapter(
      TilingStrategy(
        this.props.minTileWidth,
        this.props.minTileHeight,
        treemapSquarify.ratio(1.61)
      ),
      RenderStrategy(this.el)
    );

    adapter.load(this.props.url);
  }

  componentDidUpdate() {
    console.debug('[componentDidUpdate]');
  }

  render() {
    return (
      <div
        ref={el => (this.el = el)}
        style={{
          width: this.props.width + 'px',
          height: this.props.height + 'px',
          position: 'relative'
        }}
      />
    );
  }
}

export default Treemap;
