/**
 * Finds the index of an item in an observable sequence based on the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable sequence to search within.
 * @param {Object} findConfig - Configuration object specifying the search criteria.
 * @returns {any} The result of the operate method, typically the index of the found item or -1 if not found.
 */
function findIndexInObservable(sourceObservable, findConfig) {
  // Create a find operation with the mode set to 'index'
  const findOperation = q_9.createFind(sourceObservable, findConfig, "index");
  // Execute the find operation using the operate method
  return $enhanceComponentDisplayNames.operate(findOperation);
}

module.exports = findIndexInObservable;