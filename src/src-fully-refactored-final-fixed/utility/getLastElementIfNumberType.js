/**
 * Returns the last element from the source array if the result of getLastElement(sourceArray) is a number.
 * Otherwise, returns the provided fallback value.
 *
 * @param {Array} sourceArray - The array to check and potentially pop the last element from.
 * @param {*} fallbackValue - The value to return if getLastElement(sourceArray) does not return a number.
 * @returns {*} The last element of sourceArray if getLastElement(sourceArray) returns a number, otherwise fallbackValue.
 */
function getLastElementIfNumberType(sourceArray, fallbackValue) {
  // Check if getLastElement returns a number for the given sourceArray
  if (typeof getLastElement(sourceArray) === "number") {
    // If so, remove and return the last element of the array
    return sourceArray.pop();
  }
  // Otherwise, return the fallback value
  return fallbackValue;
}

module.exports = getLastElementIfNumberType;