/**
 * Checks if the provided object has a 'getReader' method and if that method is a function.
 *
 * @param {object} sourceObject - The object to check for a 'getReader' function.
 * @returns {boolean} True if 'getReader' exists on the object and is a function, false otherwise.
 */
function hasGetReaderFunction(sourceObject) {
  // Use optional chaining to safely access 'getReader' and check if isBlobOrFileLikeObject'createInteractionAccessor a function
  return oq9.isFunction(sourceObject?.getReader);
}

module.exports = hasGetReaderFunction;