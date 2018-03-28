function moveNodes(
  node,
  tile,
  containerWidth,
  containerHeight,
  tileMinWidth,
  tileMinHeight
) {

  if (2 >= node.children.length ) {
    return node;
  }

  let isMinimumWidthAndHeight = false;
  const collectedNodes = [];
  while (!isMinimumWidthAndHeight && 0 < node.children.length) {
    // Recalculate the total.
    node.sum(
      n =>
        undefined === n.info || null === n.info
          ? 0
          : Math.abs(n.info.score * 1000)
    );

    console.debug(
      'Minimum width and height: ',
      (isMinimumWidthAndHeight = u(
        t(node, tile, containerWidth, containerHeight),
        tileMinWidth,
        tileMinHeight
      ))
    );

    collectedNodes.splice(0, 0, node.children.pop());
  }

  if (1 === collectedNodes.length) {
    // Push back the single node.
    node.children.push(collectedNodes[0]);
    return node;
  }

  const otherNode = collectedNodes[0].copy(); // Object.assign({}, collectedNodes[0]);
  otherNode.data = { name: 'Other...' };
  otherNode.parent = node;
  otherNode.children = collectedNodes;
  otherNode.children.forEach(n => n.depth++);
  console.debug({ otherNode, collectedNodes });

  node.children.push(otherNode);
}

function t(node, tilingFn, width, height) {
  tilingFn(node, 0, 0, width, height);

  return node;
}

function u(node, minWidth, minHeight) {
  for (var i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const width = child.x1 - child.x0;
    const height = child.y1 - child.y0;
    if (minWidth > width || minHeight > height) {
      console.debug(
        `Node ${i} is too small [ ${width} over ${minWidth} ][ ${height} over ${minHeight} ].`
      );
      return false;
    }
  }

  return true;
}

export default function(minWidth, minHeight, tilingStrategy) {
  return function(node, x0, y0, x1, y1) {
    console.debug('Tiling starting...', { node, x0, y0, x1, y1 });

    if (0 === x0 && 0 === y0) {
      const containerWidth = x1 - x0;
      const containerHeight = y1 - y0;

      moveNodes(
        node,
        tilingStrategy,
        containerWidth,
        containerHeight,
        minWidth,
        minHeight
      );
    }

    tilingStrategy(node, x0, y0, x1, y1);

    console.debug('Tiling complete.', { node, x0, y0, x1, y1 });
  };
}
