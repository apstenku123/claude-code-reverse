/**
 * Synchronizes the contents of an observable collection with its underlying data source.
 * Ensures that the collection reflects the latest state of its backing node, cleaning up stale items and updating its length.
 *
 * @param {Object} observableCollection - The observable collection object to synchronize. Must have _node, _inc, _refresh, and $$length properties.
 * @returns {void}
 */
function synchronizeObservableCollection(observableCollection) {
  // Determine the current increment/version of the underlying node or its owner document
  const currentIncrement = observableCollection._node._inc || observableCollection._node.ownerDocument._inc;

  // If the collection'createInteractionAccessor increment is outdated, refresh its contents
  if (observableCollection._inc !== currentIncrement) {
    // Refresh the collection from the underlying node
    const refreshedItems = observableCollection._refresh(observableCollection._node);

    // Update the 'length' property and check if items need to be removed
    assignPropertyValue(observableCollection, "length", refreshedItems.length);

    // If the collection had more items previously, remove the excess properties
    if (!observableCollection.$$length || refreshedItems.length < observableCollection.$$length) {
      for (let index = refreshedItems.length; index in observableCollection; index++) {
        if (Object.prototype.hasOwnProperty.call(observableCollection, index)) {
          delete observableCollection[index];
        }
      }
    }

    // Copy refreshed items into the collection
    copyOwnProperties(refreshedItems, observableCollection);
    // Update the collection'createInteractionAccessor increment to the current value
    observableCollection._inc = currentIncrement;
  }
}

module.exports = synchronizeObservableCollection;