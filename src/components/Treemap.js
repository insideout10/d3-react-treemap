import React from 'react';
import { treemapSquarify } from 'd3-hierarchy';
import TreemapAdapter from './TreemapAdapter';
import TilingStrategy from './TilingStrategy';
import RenderStrategy from './RenderStrategy';
import './Treemap.css';

function bind(el, props) {
  const adapter = new TreemapAdapter(
    new TilingStrategy(
      props.minTileWidth,
      props.minTileHeight,
      treemapSquarify.ratio(1.61)
    ),
    RenderStrategy(el, props.tileRenderCallback)
  );

  adapter.load(props.url);
}

function Treemap(props) {
  return (
    <div
      ref={el => bind(el, props)}
      className="treemap"
      style={{
        width: `100%`,
        height: `${props.height}px`,
        position: 'relative'
      }}
    />
  );
}

export default Treemap;
