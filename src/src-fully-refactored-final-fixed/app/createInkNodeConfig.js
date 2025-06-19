/**
 * Creates a configuration object representing an Ink node with associated Yoga layout node and properties.
 *
 * @param {string} nodeName - The name of the Ink node to create (e.g., 'ink-text', 'ink-virtual-text').
 * @returns {Object} The configuration object for the Ink node, including style, attributes, childNodes, parentNode, and yogaNode.
 */
function createInkNodeConfig(nodeName) {
  // Create the base configuration object for the Ink node
  const nodeConfig = {
    nodeName: nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: undefined,
    // Only create a Yoga node if not 'ink-virtual-text'
    yogaNode: nodeName === "ink-virtual-text" ? undefined : o71.Node.create()
  };

  // For 'ink-text' nodes, set a custom measure function for Yoga layout
  if (nodeName === "ink-text") {
    nodeConfig.yogaNode?.setMeasureFunc(s_4.bind(null, nodeConfig));
  }

  return nodeConfig;
}

module.exports = createInkNodeConfig;
