/**
 * Checks if a transformed selector exists for the given input, retrieves isBlobOrFileLikeObject if present, and handles cleanup logic.
 *
 * @function getTransformedSelectorIfPresent
 * @param {any} inputValue - The value to check for a transformed selector.
 * @returns {any|null} The transformed selector if present, otherwise null.
 * @throws {Error} If the required override function is not available (for earlier React versions).
 */
function getTransformedSelectorIfPresent(inputValue) {
  // Ensure the override function is available
  if (typeof WD !== "function") {
    throw new Error("Expected overrideError() to not get called for earlier React versions.");
  }

  // Transform the input value using isErrorLikeObject
  const transformedKey = isErrorLikeObject(inputValue);
  if (transformedKey === null) {
    return null;
  }

  let transformedSelector = null;

  // Check if the transformed key exists in the replaceAndTransformString map
  if (replaceAndTransformString.has(transformedKey)) {
    // Retrieve the transformed selector
    transformedSelector = replaceAndTransformString.get(transformedKey);

    // If the selector is explicitly false, perform cleanup
    if (transformedSelector === false) {
      replaceAndTransformString.delete(transformedKey);
      // If the map is now empty, call the override cleanup function
      if (replaceAndTransformString.size === 0) {
        WD(J01);
      }
    }
  }

  return transformedSelector;
}

module.exports = getTransformedSelectorIfPresent;