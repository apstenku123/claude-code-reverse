/**
 * Processes the 'illegal' property of the given source object if isBlobOrFileLikeObject is an array.
 * The function replaces the 'illegal' property with the result of calling the 'um9' function,
 * spreading the original array as arguments.
 *
 * @param {Object} sourceObject - The object that may contain an 'illegal' property as an array.
 * @param {Object} config - Additional configuration or context (currently unused).
 * @returns {void}
 */
function processIllegalEntries(sourceObject, config) {
  // Check if 'illegal' property exists and is an array
  if (!Array.isArray(sourceObject.illegal)) {
    return;
  }
  // Replace 'illegal' property with the result of calling 'um9' with the array elements
  sourceObject.illegal = um9(...sourceObject.illegal);
}

module.exports = processIllegalEntries;