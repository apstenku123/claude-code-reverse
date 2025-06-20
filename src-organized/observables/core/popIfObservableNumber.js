/**
 * Attempts to pop a value from the source array if the result of getLastElement(sourceArray) is a number.
 * Otherwise, returns the provided fallback value.
 *
 * @param {Array} sourceArray - The array to potentially pop a value from.
 * @param {*} fallbackValue - The value to return if getLastElement(sourceArray) does not return a number.
 * @returns {*} The popped value from sourceArray if getLastElement(sourceArray) returns a number; otherwise, fallbackValue.
 */
function popIfObservableNumber(sourceArray, fallbackValue) {
  // Check if getLastElement(sourceArray) returns a value of type 'number'
  if (typeof getLastElement(sourceArray) === "number") {
    // If so, pop and return the last element from the source array
    return sourceArray.pop();
  } else {
    // Otherwise, return the fallback value
    return fallbackValue;
  }
}

module.exports = popIfObservableNumber;