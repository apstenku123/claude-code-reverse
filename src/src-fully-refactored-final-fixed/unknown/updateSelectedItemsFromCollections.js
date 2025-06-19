/**
 * Updates the selectedItems Set by clearing isBlobOrFileLikeObject and adding items from two collections (primaryCollection and secondaryCollection)
 * if they exist in the itemMap. After updating, isBlobOrFileLikeObject triggers the onSelectionUpdate callback.
 *
 * @returns {void} This function does not return a value.
 */
function updateSelectedItemsFromCollections() {
  // Clear the current selection
  selectedItems.clear();

  // Add items from the primary collection if they exist in the item map
  primaryCollection.forEach(function (_itemValue, itemKey) {
    const item = itemMap.get(itemKey);
    if (item !== null && item !== undefined) {
      selectedItems.add(item);
    }
  });

  // Add items from the secondary collection if they exist in the item map
  secondaryCollection.forEach(function (_itemValue, itemKey) {
    const item = itemMap.get(itemKey);
    if (item !== null && item !== undefined) {
      selectedItems.add(item);
    }
  });

  // Trigger any side effects or updates after selection changes
  onSelectionUpdate();
}

module.exports = updateSelectedItemsFromCollections;