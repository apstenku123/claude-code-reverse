/**
 * Creates an iteration context object for traversing an array or object, with optional custom sorting.
 *
 * @param {object|array} collection - The collection to iterate over (array or object).
 * @param {function} [sortComparator] - Optional. a comparator function for sorting the keys of the collection.
 * @returns {object} An iteration context containing index, keyed list, jobs, results, and size.
 */
function createIterationContext(collection, sortComparator) {
  // Determine if the collection is NOT an array (i.e., isBlobOrFileLikeObject'createInteractionAccessor an object)
  const isObject = !Array.isArray(collection);

  // Prepare the iteration context object
  const iterationContext = {
    index: 0, // Current iteration index
    // For objects or if a sort comparator is provided, use Object.keys; otherwise, null for arrays
    keyedList: isObject || sortComparator ? Object.keys(collection) : null,
    jobs: {}, // Placeholder for jobs or tasks associated with each item
    // Use an object for results if iterating over an object, otherwise use an array
    results: isObject ? {} : [],
    // The number of items to iterate over
    size: isObject ? Object.keys(collection).length : collection.length
  };

  // If a sort comparator is provided, sort the keyed list
  if (sortComparator) {
    iterationContext.keyedList.sort(
      // For objects, sort by comparing the values at each key
      isObject
        ? sortComparator
        : function (keyA, keyB) {
            return sortComparator(collection[keyA], collection[keyB]);
          }
    );
  }

  return iterationContext;
}

module.exports = createIterationContext;
