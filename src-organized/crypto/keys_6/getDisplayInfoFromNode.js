/**
 * Retrieves display information (displayName, key, and index) from a node object.
 * Handles special cases based on the node'createInteractionAccessor tag property, such as mounted roots and typed nodes.
 *
 * @param {Object} node - The node object to extract display information from.
 * @param {string|number} node.key - The unique key associated with the node.
 * @param {number} node.index - The index of the node within its parent.
 * @param {string|number} node.tag - The tag indicating the type of node.
 * @param {any} node.type - The type of the node (used for certain tags).
 * @returns {Object} An object containing displayName, key, and index for the node.
 */
function getDisplayInfoFromNode(node) {
  const { key, index, tag } = node;
  // Initialize displayName using the notification initializer
  let displayName = initializeNotification(node);

  switch (tag) {
    case notifySubscribers: {
      // For mounted root nodes, get a pseudo key and look up the display name
      const pseudoKey = evaluateOrFallback(node);
      const mountedRootInfo = Iy.get(pseudoKey);
      if (mountedRootInfo === undefined) {
        throw new Error("Expected mounted root to have known pseudo key.");
      }
      displayName = mountedRootInfo;
      break;
    }
    case K6: {
      // For typed nodes, use the node'createInteractionAccessor type as the display name
      displayName = node.type;
      break;
    }
    default:
      // For other tags, keep the initialized displayName
      break;
  }

  return {
    displayName,
    key,
    index
  };
}

module.exports = getDisplayInfoFromNode;