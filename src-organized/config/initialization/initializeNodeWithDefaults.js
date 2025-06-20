/**
 * Initializes a node object using the createAccessorFunctionProxy function and sets default properties.
 *
 * @param {Object} node - The node object to initialize.
 * @param {Object} config - Configuration object passed to the createAccessorFunctionProxy function.
 * @returns {Object} The initialized node object with default properties set.
 */
function initializeNodeWithDefaults(node, config) {
  // Initialize the node using the external createAccessorFunctionProxy function
  const initializedNode = createAccessorFunctionProxy(node, config);
  // Set the starting index to 0
  initializedNode.index = 0;
  // Set the sibling property to null by default
  initializedNode.sibling = null;
  return initializedNode;
}

module.exports = initializeNodeWithDefaults;