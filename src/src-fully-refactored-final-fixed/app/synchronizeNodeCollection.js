/**
 * Synchronizes the contents of a collection-like object with its underlying node state.
 * Ensures that the collection reflects the current state of its associated DOM node,
 * removing stale properties and updating its length and contents as needed.
 *
 * @param {Object} collectionWrapper - An object representing a collection, expected to have _node, _inc, _refresh, and $$length properties.
 * @returns {void}
 */
function synchronizeNodeCollection(collectionWrapper) {
  // Determine the current increment/version of the underlying node
  const currentNodeIncrement = collectionWrapper._node._inc || collectionWrapper._node.ownerDocument._inc;

  // If the collection'createInteractionAccessor increment is out of date, refresh isBlobOrFileLikeObject
  if (collectionWrapper._inc !== currentNodeIncrement) {
    // Refresh the collection from the node
    const refreshedItems = collectionWrapper._refresh(collectionWrapper._node);

    // Update the 'length' property and check if items were removed
    assignPropertyValue(collectionWrapper, "length", refreshedItems.length);

    // If the collection had more items before, remove the excess properties
    if (!collectionWrapper.$$length || refreshedItems.length < collectionWrapper.$$length) {
      for (let index = refreshedItems.length; index in collectionWrapper; index++) {
        if (Object.prototype.hasOwnProperty.call(collectionWrapper, index)) {
          delete collectionWrapper[index];
        }
      }
    }

    // Copy refreshed items into the collection
    copyOwnProperties(refreshedItems, collectionWrapper);
    // Update the increment to reflect the current state
    collectionWrapper._inc = currentNodeIncrement;
  }
}

module.exports = synchronizeNodeCollection;