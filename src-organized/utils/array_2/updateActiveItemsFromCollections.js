/**
 * Updates the activeItems Set by collecting items from two collections (primaryCollection and secondaryCollection)
 * using a mapping (itemMap), and then triggers a refresh operation.
 *
 * @function updateActiveItemsFromCollections
 * @returns {void}
 */
function updateActiveItemsFromCollections() {
  // Clear the current set of active items
  activeItems.clear();

  // Add mapped items from the primary collection to the active items set
  primaryCollection.forEach(function (_itemValue, itemKey) {
    const mappedItem = itemMap.get(itemKey);
    if (mappedItem != null) {
      activeItems.add(mappedItem);
    }
  });

  // Add mapped items from the secondary collection to the active items set
  secondaryCollection.forEach(function (_itemValue, itemKey) {
    const mappedItem = itemMap.get(itemKey);
    if (mappedItem != null) {
      activeItems.add(mappedItem);
    }
  });

  // Trigger a refresh or update operation after updating the active items
  triggerRefresh();
}

module.exports = updateActiveItemsFromCollections;