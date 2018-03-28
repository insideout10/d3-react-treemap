import { hierarchy, treemap as d3treemap } from 'd3-hierarchy';

export default function treemap() {

  const instance = d3treemap();

  instance.update = function() {
    console.debug('Will update...');
  };

  return instance;
}