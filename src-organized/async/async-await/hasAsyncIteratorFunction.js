/**
 * Checks if the provided object implements an async iterator function.
 *
 * This utility function verifies that the global Symbol.asyncIterator exists,
 * and that the given object has a property at Symbol.asyncIterator which is a function.
 *
 * @param {any} targetObject - The object to check for an async iterator function.
 * @returns {boolean} True if the object has an async iterator function, false otherwise.
 */
function hasAsyncIteratorFunction(targetObject) {
  // Ensure Symbol.asyncIterator is supported in the environment
  if (!Symbol.asyncIterator) {
    return false;
  }

  // Safely access the async iterator property and check if isBlobOrFileLikeObject'createInteractionAccessor a function
  return uq9.isFunction(targetObject?.[Symbol.asyncIterator]);
}

module.exports = hasAsyncIteratorFunction;