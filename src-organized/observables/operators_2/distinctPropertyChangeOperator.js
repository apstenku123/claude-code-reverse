/**
 * Returns an RxJS operator that emits items from the source Observable only when the specified property changes.
 * Optionally, a custom comparator function can be provided to determine property equality.
 *
 * @param {string} propertyKey - The property name to watch for changes on each emitted object.
 * @param {function} [comparator] - Optional. a function to compare previous and current property values. Should return true if values are considered equal.
 * @returns {function} An RxJS operator function for use in a pipe.
 */
function distinctPropertyChangeOperator(propertyKey, comparator) {
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

module.exports = distinctPropertyChangeOperator;