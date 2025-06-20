/**
 * Filters a collection based on a predicate function.
 *
 * @param {Array} collection - The array or collection to filter.
 * @param {Function} predicate - The predicate function to apply to each item. If null or undefined, returns the processed collection as is.
 * @returns {Array} The filtered array, or the processed collection if no predicate is provided.
 */
function filterCollectionByPredicate(collection, predicate) {
  // Return empty array if collection is null, undefined, or empty
  if (!(collection && collection.length)) return [];

  // Process the collection using zipArraysWithPadding(dependency)
  const processedCollection = zipArraysWithPadding(collection);

  // If no predicate is provided, return the processed collection as is
  if (predicate == null) return processedCollection;

  // Otherwise, filter the processed collection using the predicate
  return mapArray(processedCollection, function (item) {
    // handleReturnIfPresent applies the predicate to the item (a is assumed to be a context or additional argument)
    return handleReturnIfPresent(predicate, sourceObservable, item);
  });
}

module.exports = filterCollectionByPredicate;