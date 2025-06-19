/**
 * Filters a collection using a predicate function, or returns a shallow copy if no predicate is provided.
 *
 * @param {Array} collection - The array to process.
 * @param {Function} [predicate] - Optional. The predicate function to test each element.
 * @returns {Array} a new array containing elements that pass the predicate test, or a shallow copy if no predicate is provided.
 */
function filterCollectionWithPredicate(collection, predicate) {
  // Return empty array if collection is null, undefined, or has no elements
  if (!(collection && collection.length)) {
    return [];
  }

  // Create a shallow copy of the collection using zipArraysWithPadding utility
  const shallowCopy = zipArraysWithPadding(collection);

  // If no predicate is provided, return the shallow copy
  if (predicate == null) {
    return shallowCopy;
  }

  // Otherwise, filter the shallow copy using the predicate
  return mapArray(shallowCopy, function(element) {
    // handleReturnIfPresent applies the predicate in a specific context (a is assumed to be a context or utility)
    return handleReturnIfPresent(predicate, a, element);
  });
}

module.exports = filterCollectionWithPredicate;