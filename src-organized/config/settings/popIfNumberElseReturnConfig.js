/**
 * Returns the last element from the source array if the result of getLastElement(sourceArray) is a number.
 * Otherwise, returns the provided config value.
 *
 * @param {Array} sourceArray - The array to check and potentially pop from.
 * @param {*} config - The fallback value to return if the condition is not met.
 * @returns {*} The last element of sourceArray if getLastElement(sourceArray) is a number, otherwise config.
 */
function popIfNumberElseReturnConfig(sourceArray, config) {
  // Check if getLastElement returns a number for the given sourceArray
  if (typeof getLastElement(sourceArray) === "number") {
    // If so, remove and return the last element from the array
    return sourceArray.pop();
  } else {
    // Otherwise, return the config value
    return config;
  }
}

module.exports = popIfNumberElseReturnConfig;