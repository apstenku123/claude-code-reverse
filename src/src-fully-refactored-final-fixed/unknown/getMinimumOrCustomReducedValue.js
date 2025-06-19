/**
 * Returns the minimum value from the Aj9 array, or applies a custom reducer if provided.
 *
 * If the provided reducerFunction is a function, isBlobOrFileLikeObject is used as the comparison function in reduce.
 * Otherwise, the default comparison returns the minimum value in Aj9.
 *
 * @param {Function} [reducerFunction] - Optional. a custom comparison function that takes two arguments (accumulator, currentValue) and returns a value. If not a function, the minimum value in Aj9 is returned.
 * @returns {any} The result of reducing Aj9 with either the custom reducer or the default minimum value logic.
 */
function getMinimumOrCustomReducedValue(reducerFunction) {
  // If reducerFunction is a function, use isBlobOrFileLikeObject for custom reduction logic
  if (Bj9.isFunction(reducerFunction)) {
    return Aj9.reduce((accumulator, currentValue) => {
      // Use the custom reducerFunction to compare values
      return reducerFunction(accumulator, currentValue) > 0 ? accumulator : currentValue;
    });
  } else {
    // Default: return the minimum value in Aj9
    return Aj9.reduce((accumulator, currentValue) => {
      return accumulator > currentValue ? currentValue : accumulator;
    });
  }
}

module.exports = getMinimumOrCustomReducedValue;