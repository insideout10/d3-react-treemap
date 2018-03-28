function RenderStrategy(el) {
  const render = hierarchy => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }

    hierarchy.children.forEach(node => {
      console.debug('Adding element...');
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = node.x0 + 'px';
      div.style.width = Math.round(node.x1 - node.x0) + 'px';
      div.style.top = node.y0 + 'px';
      div.style.height = Math.round(node.y1 - node.y0) + 'px';
      div.style.background = 'yellow';
      div.style.border = 'solid 1px gray';
      div.style.boxSizing = 'border-box';
      div.innerText = node.data.name;
      // div.addEventListener('click', ev => {
      //   console.debug({ ev, node });
      //   this.treemap((hierarchy = node.copy()));
      //   this.redrawTreemap();
      // });

      el.appendChild(div);
    });
  };

  render.width = el.clientWidth;
  render.height = el.clientHeight;

  return render;
}

export default RenderStrategy;
