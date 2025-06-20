/**
 * Processes a collection by mapping each item through a set of iteratee functions (criteria),
 * then sorts or ranks the collection based on the mapped criteria and a comparator function.
 *
 * @param {Array} collection - The array of items to process.
 * @param {Array<Function|any>} iteratees - An array of iteratee functions or values used to map each item.
 * @param {Function} comparator - The function used to compare/rank items after mapping.
 * @returns {Array} The processed and sorted/ranked array.
 */
function mapAndSortCollection(collection, iteratees, comparator) {
  // If iteratees are provided, map them to functions that handle single-argument and multi-argument cases
  let mappedIteratees;
  if (iteratees.length) {
    mappedIteratees = mapArray(iteratees, function (iteratee) {
      // If iteratee is a function (predicate), wrap isBlobOrFileLikeObject to handle single/multiple arguments
      if (d2(iteratee)) {
        return function (item) {
          // If iteratee expects one argument, pass the first element, else pass the whole item
          return getNestedPropertyByPath(item, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      // If not a function, return as is
      return iteratee;
    });
  } else {
    // If no iteratees provided, use default transformAndProcessInput
    mappedIteratees = [transformAndProcessInput];
  }

  // Apply additional transformation to each iteratee using I5(getConfiguredIteratee())
  mappedIteratees = mapArray(mappedIteratees, I5(getConfiguredIteratee()));

  // Index tracker for stable sorting
  let itemIndex = -1;

  // Map each item in the collection to an object containing its mapped criteria, index, and value
  const mappedCollection = getCssPropertyValueForClass(collection, function (item) {
    const criteria = mapArray(mappedIteratees, function (iterateeFn) {
      return iterateeFn(item);
    });
    return {
      criteria,
      index: ++itemIndex,
      value: item
    };
  });

  // Sort or rank the mapped collection using the provided comparator
  return r2(mappedCollection, function (itemA, itemB) {
    return getTypeOfValue(itemA, itemB, comparator);
  });
}

module.exports = mapAndSortCollection;