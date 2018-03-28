import { hierarchy, treemap } from 'd3-hierarchy';
import tilingStrategy from './TilingStrategy';

class TreemapAdapter {
  constructor(tilingStrategy, renderStrategy) {
    console.debug('Creating new TreemapAdapter instance...');

    this.tilingStrategy = tilingStrategy;
    this.renderStategy = renderStrategy;
  }

  load(url) {
    console.debug(`Loading ${url}...`);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.debug(`${url} loaded.`, { json });

        this.hierarchy = hierarchy(json).sum(
          data => (null === data.info ? 0 : data.info.score)
        );

        this.treemap = treemap()
          .size([this.renderStategy.width, this.renderStategy.height])
          .tile(this.tilingStrategy);

        // Recalculate the tiles sizes.
        this.treemap(this.hierarchy);

        // Render the hierarchy.
        this.renderStategy(this.hierarchy);
      })
      .catch(() => console.error('An error occurred'));
  }
}

export default TreemapAdapter;
