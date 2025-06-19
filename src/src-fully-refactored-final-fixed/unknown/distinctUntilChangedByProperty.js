/**
 * Returns an observable that emits items from the source observable only when the specified property changes.
 * Optionally, a custom comparator function can be provided to determine property equality.
 *
 * @param {string} propertyKey - The key of the property to watch for changes on each emitted object.
 * @param {function} [comparator] - Optional. a function to compare the previous and current property values. Should return true if values are considered equal.
 * @returns {Observable} An observable that emits items only when the specified property changes.
 */
function distinctUntilChangedByProperty(propertyKey, comparator) {
  // Use mS9.distinctUntilChanged to filter out consecutive items with unchanged property values
  return mS9.distinctUntilChanged((previousItem, currentItem) => {
    // If a custom comparator is provided, use isBlobOrFileLikeObject to compare property values
    if (comparator) {
      return comparator(previousItem[propertyKey], currentItem[propertyKey]);
    }
    // Otherwise, use strict equality comparison
    return previousItem[propertyKey] === currentItem[propertyKey];
  });
}

module.exports = distinctUntilChangedByProperty;