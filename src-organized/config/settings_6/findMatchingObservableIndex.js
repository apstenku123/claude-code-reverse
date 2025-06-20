/**
 * Searches for the index of the first observable in the list whose first element matches the given config using the OH comparator.
 *
 * @param {Array<Array<any>>} observablesList - An array of observables, where each observable is represented as an array. The first element of each observable is compared.
 * @param {any} config - The configuration or value to compare against each observable'createInteractionAccessor first element.
 * @returns {number} The index of the first matching observable, or -1 if no match is found.
 */
function findMatchingObservableIndex(observablesList, config) {
  let index = observablesList.length - 1;
  // Iterate backwards through the observablesList
  while (index >= 0) {
    // Compare the first element of the current observable with the config using OH
    if (OH(observablesList[index][0], config)) {
      return index;
    }
    index--;
  }
  // Return -1 if no matching observable is found
  return -1;
}

module.exports = findMatchingObservableIndex;