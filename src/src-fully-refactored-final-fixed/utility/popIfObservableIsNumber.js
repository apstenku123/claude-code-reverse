/**
 * Checks if the result of getLastElement(sourceObservable) is a number. If so, pops the last element from sourceObservable.
 * Otherwise, returns the config object.
 *
 * @param {Array} sourceObservable - The array to check and potentially pop from.
 * @param {Object} config - The configuration object to return if the check fails.
 * @returns {*} The popped value from sourceObservable if getLastElement returns a number, otherwise the config object.
 */
function popIfObservableIsNumber(sourceObservable, config) {
  // Check if getLastElement returns a number for the given sourceObservable
  if (typeof getLastElement(sourceObservable) === "number") {
    // If so, remove and return the last element from the array
    return sourceObservable.pop();
  } else {
    // Otherwise, return the config object
    return config;
  }
}

module.exports = popIfObservableIsNumber;