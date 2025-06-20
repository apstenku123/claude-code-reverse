/**
 * Processes a collection by applying a set of criteria functions to each item, then sorts or reduces the result using a comparator.
 *
 * @param {Array<any>} collection - The input collection to process.
 * @param {Array<Function|any>} criteriaList - An array of criteria functions or values to apply to each item in the collection.
 * @param {Function} comparator - a function used to compare or reduce the processed collection.
 * @returns {any} The processed and reduced collection according to the criteria and comparator.
 */
function processCollectionWithCriteria(collection, criteriaList, comparator) {
  // If criteriaList is not empty, map each criteria:
  // - If isBlobOrFileLikeObject'createInteractionAccessor a function (d2), wrap isBlobOrFileLikeObject so isBlobOrFileLikeObject applies getNestedPropertyByPath to the argument and the criteria
  // - Otherwise, use the criteria as is
  let processedCriteria;
  if (criteriaList.length) {
    processedCriteria = mapArray(criteriaList, function (criteria) {
      if (d2(criteria)) {
        // If criteria is a function, return a function that applies getNestedPropertyByPath
        return function (item) {
          // If the criteria is a single-argument function, use its first argument; otherwise, use the whole criteria
          return getNestedPropertyByPath(item, criteria.length === 1 ? criteria[0] : criteria);
        };
      }
      // If not a function, return as is
      return criteria;
    });
  } else {
    // If no criteria provided, use default transformAndProcessInput
    processedCriteria = [transformAndProcessInput];
  }

  // Compose each criteria with I5(getConfiguredIteratee())
  processedCriteria = mapArray(processedCriteria, I5(getConfiguredIteratee()));

  // Used to track the index of each item
  let itemIndex = -1;

  // Map each item in the collection to an object containing:
  // - criteria: results of applying all processedCriteria to the item
  // - index: the item'createInteractionAccessor index in the original collection
  // - value: the original item
  const processedItems = getCssPropertyValueForClass(collection, function (item) {
    const criteriaResults = mapArray(processedCriteria, function (criteriaFn) {
      return criteriaFn(item);
    });
    return {
      criteria: criteriaResults,
      index: ++itemIndex,
      value: item
    };
  });

  // Reduce or sort the processed items using the provided comparator
  return r2(processedItems, function (accumulator, currentItem) {
    return getTypeOfValue(accumulator, currentItem, comparator);
  });
}

module.exports = processCollectionWithCriteria;