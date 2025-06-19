/**
 * Sets the 'flags' property on the given fiber node if certain conditions are met.
 *
 * If the global 'processWithTransformedObservable' flag is truthy and the fiber node does not have an alternate,
 * this function sets the second bit (value 2) on the fiber'createInteractionAccessor 'flags' property.
 *
 * @param {Object} fiberNode - The fiber node to check and potentially update.
 * @returns {Object} The updated fiber node.
 */
function markFlagIfNoAlternate(fiberNode) {
  // Check if the global 'processWithTransformedObservable' flag is set and the fiber node has no alternate
  if (processWithTransformedObservable && fiberNode.alternate === null) {
    // Set the second bit (value 2) on the 'flags' property
    fiberNode.flags |= 2;
  }
  return fiberNode;
}

module.exports = markFlagIfNoAlternate;