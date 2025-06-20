/**
 * Creates a virtual node object for use in the Ink rendering engine.
 *
 * Depending on the node type, isBlobOrFileLikeObject initializes the yogaNode property appropriately.
 * For 'ink-virtual-text', yogaNode is undefined. For other node types, yogaNode is created using o71.Node.create().
 * If the node type is 'ink-text', a custom measure function is set on the yogaNode.
 *
 * @param {string} nodeName - The type of node to create (e.g., 'ink-text', 'ink-virtual-text').
 * @returns {Object} The constructed virtual node object with properties for rendering and layout.
 */
function createInkNode(nodeName) {
  // Initialize the virtual node object with default properties
  const virtualNode = {
    nodeName: nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: undefined,
    // yogaNode is only created for non-virtual-text nodes
    yogaNode: nodeName === "ink-virtual-text" ? undefined : o71.Node.create()
  };

  // For 'ink-text' nodes, set a custom measure function on the yogaNode
  if (nodeName === "ink-text") {
    virtualNode.yogaNode?.setMeasureFunc(s_4.bind(null, virtualNode));
  }

  return virtualNode;
}

module.exports = createInkNode;
