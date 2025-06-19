/**
 * Retrieves display metadata (displayName, key, and index) from a node object.
 * Handles special cases based on the node'createInteractionAccessor tag property.
 *
 * @param {Object} node - The node object to extract metadata from.
 * @param {string|number} node.key - The unique key for the node.
 * @param {number} node.index - The index of the node.
 * @param {string|number} node.tag - The tag indicating the node type.
 * @param {any} node.type - The type of the node (used for certain tags).
 * @returns {Object} An object containing displayName, key, and index.
 */
function getDisplayMetadataFromNode(node) {
  const { key: nodeKey, index: nodeIndex, tag: nodeTag } = node;
  // Compute the initial display name using d1
  let displayName = d1(node);

  switch (nodeTag) {
    case J4: {
      // For root nodes, get a pseudo key and look up the display name from Iy
      const pseudoKey = evaluateOrFallback(node);
      const mountedRootDisplayName = Iy.get(pseudoKey);
      if (mountedRootDisplayName === undefined) {
        throw new Error("Expected mounted root to have known pseudo key.");
      }
      displayName = mountedRootDisplayName;
      break;
    }
    case K6:
      // For certain tags, use the node'createInteractionAccessor type as the display name
      displayName = node.type;
      break;
    default:
      // For all other tags, keep the computed display name
      break;
  }

  return {
    displayName,
    key: nodeKey,
    index: nodeIndex
  };
}

module.exports = getDisplayMetadataFromNode;