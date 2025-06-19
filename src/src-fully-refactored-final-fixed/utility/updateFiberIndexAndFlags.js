/**
 * Updates the index and flags of a fiber node based on its alternate and a global condition.
 *
 * @param {Object} fiberNode - The fiber node whose index and flags are to be updated.
 * @param {number} newIndex - The new index value to assign to the fiber node.
 * @param {number} currentIndex - The current index value to assign to the fiber node'createInteractionAccessor index property.
 * @returns {number} - Returns the determined index value after update.
 */
function updateFiberIndexAndFlags(fiberNode, newIndex, currentIndex) {
  // Set the current index on the fiber node
  fiberNode.index = currentIndex;

  // If the global 'processWithTransformedObservable' flag is falsy, set a specific flag and return newIndex
  if (!processWithTransformedObservable) {
    fiberNode.flags |= 1048576; // Set the 21st bit flag (custom meaning in React internals)
    return newIndex;
  }

  // If the fiber node has an alternate, compare its index to newIndex
  const alternateFiber = fiberNode.alternate;
  if (alternateFiber !== null) {
    const alternateIndex = alternateFiber.index;
    // If the alternate'createInteractionAccessor index is less than newIndex, set a flag and return newIndex
    if (alternateIndex < newIndex) {
      fiberNode.flags |= 2; // Set the 2nd bit flag (custom meaning in React internals)
      return newIndex;
    }
    // Otherwise, return the alternate'createInteractionAccessor index
    return alternateIndex;
  }

  // If no alternate exists, set the flag and return newIndex
  fiberNode.flags |= 2;
  return newIndex;
}

module.exports = updateFiberIndexAndFlags;