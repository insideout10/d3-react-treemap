function RenderStrategy(el, tileRenderCallback) {
  // Define the toolbar height.
  const toolbarHeight = 20;

  // Define the treemap width and height according to the container height
  // and taking into consideration the toolbar height.
  const treemapWidth = el.clientWidth;
  const treemapHeight = el.clientHeight - toolbarHeight;

  // The stack of hierarchies.
  const stack = [];

  // Create the toolbar element.
  const toolbarEl = document.createElement('div');
  toolbarEl.className = 'treemap__toolbar';
  toolbarEl.style.height = `${toolbarHeight}px`;
  el.appendChild(toolbarEl);

  // Create the treemap element.
  const treemapEl = document.createElement('div');
  treemapEl.className = 'treemap__hierarchy';
  treemapEl.style.position = 'relative';
  treemapEl.style.width = `${treemapWidth}px`;
  treemapEl.style.height = `${treemapHeight}px`;
  el.appendChild(treemapEl);

  function clear(el) {
    // Remove all child nodes.
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  function renderToolbar(hierarchy) {
    clear(toolbarEl);

    console.debug({ stack });
    stack.push(hierarchy);

    stack.forEach((level, i) => {
      const div = document.createElement('div');
      div.innerText = stack[i].data.name;
      div.addEventListener('click', () => {
        console.debug(`Before splicing at ${i}...`, Object.assign({}, stack));
        stack.splice(i);
        console.debug(`After splicing at ${i}...`, Object.assign({}, stack));
        render(level);
      });
      toolbarEl.appendChild(div);
    });
  }

  // Render the hierarchy.
  function renderHierarchy(hierarchy) {
    clear(treemapEl);

    hierarchy.children.forEach(node => {
      console.debug('Adding element...');
      const div = document.createElement('div');
      div.className = 'treemap__hierarchy__tile';
      div.style.position = 'absolute';
      div.style.left = node.x0 + 'px';
      div.style.width = Math.round(node.x1 - node.x0) + 'px';
      div.style.top = node.y0 + 'px';
      div.style.height = Math.round(node.y1 - node.y0) + 'px';
      div.style.boxSizing = 'border-box';
      div.innerHTML = tileRenderCallback(node);

      if (node.listeners && node.listeners.click) {
        div.addEventListener('click', node.listeners.click);
        // console.debug({ ev, node });
        // this.treemap((hierarchy = node.copy()));
        // this.redrawTreemap();
        // });
      }

      treemapEl.appendChild(div);
    });

    return el;
  }

  function render(hierarchy) {
    renderToolbar(hierarchy);
    renderHierarchy(hierarchy);
  }

  render.width = treemapEl.clientWidth;
  render.height = treemapEl.clientHeight;

  return render;
}

export default RenderStrategy;
