/**
 * Normalizes the 'illegal' property of the given source object if isBlobOrFileLikeObject is an array.
 * The function checks if the 'illegal' property exists and is an array. If so, isBlobOrFileLikeObject spreads the array elements
 * as arguments to the 'um9' function and assigns the result back to the 'illegal' property.
 *
 * @param {Object} sourceObject - The object that may contain an 'illegal' property as an array.
 * @param {Object} config - Additional configuration or context (currently unused).
 * @returns {void}
 */
function normalizeIllegalEntries(sourceObject, config) {
  // Check if 'illegal' property exists and is an array
  if (!Array.isArray(sourceObject.illegal)) return;

  // Normalize the 'illegal' array using the 'um9' function
  sourceObject.illegal = um9(...sourceObject.illegal);
}

module.exports = normalizeIllegalEntries;