import { hierarchy as d3hierarchy, treemap } from 'd3-hierarchy';

class TreemapAdapter {
  constructor(tilingStrategy, renderStrategy) {
    console.debug('Creating new TreemapAdapter instance...');

    this.update = this.update.bind(this);

    // Set the tiling strategy.
    this.tilingStrategy = tilingStrategy;
    // Bind the update hierarchy to our function.
    this.tilingStrategy.update = this.update;

    this.renderStrategy = renderStrategy;
  }

  load(url) {
    console.debug(`Loading ${url}...`);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.debug(`${url} loaded.`, { json });

        this.treemap = treemap()
          .size([this.renderStrategy.width, this.renderStrategy.height])
          .tile(this.tilingStrategy.tile);

        this.update(
          d3hierarchy(json).sum(
            data => (null === data.info ? 0 : data.info.score)
          )
        );
      })
      .catch(() => console.error('An error occurred'));
  }

  update(hierarchy) {
    // Recalculate the tiles sizes.
    this.treemap(hierarchy);

    // Render the hierarchy.
    this.renderStrategy(hierarchy);
  }
}

export default TreemapAdapter;
