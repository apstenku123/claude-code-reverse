/**
 * Returns the result of popping the last element from the sourceArray if getLastElement(sourceArray) is a number; otherwise, returns the defaultValue.
 *
 * @param {Array} sourceArray - The array to check and potentially pop from.
 * @param {*} defaultValue - The value to return if getLastElement(sourceArray) is not a number.
 * @returns {*} The popped value from sourceArray if getLastElement(sourceArray) is a number, otherwise defaultValue.
 */
function popIfNumberElseReturnDefault(sourceArray, defaultValue) {
  // Check if getLastElement(sourceArray) returns a number
  if (typeof getLastElement(sourceArray) === "number") {
    // If so, pop and return the last element from sourceArray
    return sourceArray.pop();
  } else {
    // Otherwise, return the provided defaultValue
    return defaultValue;
  }
}

module.exports = popIfNumberElseReturnDefault;