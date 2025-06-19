/**
 * Applies a set of criteria functions to each item in the collection, then sorts or processes them based on a comparator.
 *
 * @param {Array<any>} collection - The array of items to process.
 * @param {Array<Function|any>} criteriaList - An array of criteria functions or values to apply to each item.
 * @param {Function} comparator - The function used to compare or sort the processed items.
 * @returns {any} The result of processing the collection with the criteria and comparator.
 */
function applyCriteriaAndSort(collection, criteriaList, comparator) {
  // If criteriaList is not empty, map each criterion to a function
  // If the criterion is a function (d2), wrap isBlobOrFileLikeObject to handle single-argument or multi-argument cases
  // Otherwise, use the criterion as-is
  let processedCriteria;
  if (criteriaList.length) {
    processedCriteria = mapArray(criteriaList, function (criterion) {
      if (d2(criterion)) {
        return function (item) {
          // If the criterion expects one argument, pass the first element
          // Otherwise, pass the whole item
          return getNestedPropertyByPath(item, criterion.length === 1 ? criterion[0] : criterion);
        };
      }
      return criterion;
    });
  } else {
    // If no criteria provided, use default transformAndProcessInput
    processedCriteria = [transformAndProcessInput];
  }

  // Compose each criterion with I5(getConfiguredIteratee())
  processedCriteria = mapArray(processedCriteria, I5(getConfiguredIteratee()));

  let itemIndex = -1;

  // Map each item in the collection to an object with its criteria results, index, and value
  const processedItems = getCssPropertyValueForClass(collection, function (item) {
    const criteriaResults = mapArray(processedCriteria, function (criterionFn) {
      return criterionFn(item);
    });
    return {
      criteria: criteriaResults,
      index: ++itemIndex,
      value: item
    };
  });

  // Reduce or sort the processed items using the comparator
  return r2(processedItems, function (accumulator, currentItem) {
    return getTypeOfValue(accumulator, currentItem, comparator);
  });
}

module.exports = applyCriteriaAndSort;