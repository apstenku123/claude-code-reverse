/**
 * Updates the index and flags of an observable node based on its alternate and a given index value.
 *
 * @param {Object} observableNode - The observable node to update (formerly yA).
 * @param {number} newIndex - The new index value to set (formerly createIterableHelper).
 * @param {number} currentIndex - The current index value to assign (formerly 0-9A).
 * @returns {number} - The resulting index value after update.
 */
function updateObservableIndexAndFlags(observableNode, newIndex, currentIndex) {
  // Set the observable node'createInteractionAccessor index to the current index
  observableNode.index = currentIndex;

  // If the global 'processWithTransformedObservable' flag is falsy, set a specific flag and return newIndex
  if (!processWithTransformedObservable) {
    observableNode.flags |= 1048576; // Set the 21st bit flag
    return newIndex;
  }

  // If the observable node has an alternate, compare its index to newIndex
  const alternateNode = observableNode.alternate;
  if (alternateNode !== null) {
    const alternateIndex = alternateNode.index;
    // If the alternate'createInteractionAccessor index is less than newIndex, set a flag and return newIndex
    if (alternateIndex < newIndex) {
      observableNode.flags |= 2; // Set the 2nd bit flag
      return newIndex;
    }
    // Otherwise, return the alternate'createInteractionAccessor index
    return alternateIndex;
  }

  // If there is no alternate, set a flag and return newIndex
  observableNode.flags |= 2; // Set the 2nd bit flag
  return newIndex;
}

module.exports = updateObservableIndexAndFlags;