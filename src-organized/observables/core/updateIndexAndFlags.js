/**
 * Updates the index and flags properties of the given node object based on the provided new index value.
 * Handles alternate nodes and a global condition flag to determine how to update the flags and what value to return.
 *
 * @param {Object} node - The node object whose index and flags may be updated. Must have 'index', 'flags', and optionally 'alternate' properties.
 * @param {number} newIndex - The new index value to assign to the node.
 * @param {number} currentIndex - The current index value to set on the node (and compare against alternate, if present).
 * @returns {number} - Returns the appropriate index value based on the logic and updates performed.
 */
function updateIndexAndFlags(node, newIndex, currentIndex) {
  // Set the node'createInteractionAccessor index to the current index
  node.index = currentIndex;

  // If the global 'processWithTransformedObservable' flag is falsy, set a specific flag and return newIndex
  if (!processWithTransformedObservable) {
    node.flags |= 1048576; // Set the 21st bit flag
    return newIndex;
  }

  // If the node has an alternate, compare its index to newIndex
  const alternateNode = node.alternate;
  if (alternateNode !== null) {
    const alternateIndex = alternateNode.index;
    if (alternateIndex < newIndex) {
      node.flags |= 2; // Mark as needing update
      return newIndex;
    }
    return alternateIndex;
  }

  // If no alternate, set the update flag and return newIndex
  node.flags |= 2;
  return newIndex;
}

module.exports = updateIndexAndFlags;