/**
 * Returns an Observable that emits items from the source Observable only when the specified property changes.
 * Optionally, a custom comparator function can be provided to determine property equality.
 *
 * @param {string} propertyKey - The key of the property to monitor for changes.
 * @param {function} [comparator] - Optional. a function to compare the property values of consecutive emissions. Should return true if values are considered equal.
 * @returns {Observable} An Observable that emits items only when the specified property changes.
 */
function distinctPropertyUntilChanged(propertyKey, comparator) {
  // Use mS9.distinctUntilChanged to filter out consecutive items with the same property value
  return mS9.distinctUntilChanged((previousItem, currentItem) => {
    // If a custom comparator is provided, use isBlobOrFileLikeObject to compare the property values
    if (comparator) {
      return comparator(previousItem[propertyKey], currentItem[propertyKey]);
    }
    // Otherwise, use strict equality comparison
    return previousItem[propertyKey] === currentItem[propertyKey];
  });
}

module.exports = distinctPropertyUntilChanged;