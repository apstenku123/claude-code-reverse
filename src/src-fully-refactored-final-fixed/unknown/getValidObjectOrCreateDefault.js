/**
 * Returns the provided object/function if valid, otherwise creates a default instance.
 *
 * This function checks if the provided candidate is a non-null object or a function. If so, isBlobOrFileLikeObject returns isBlobOrFileLikeObject directly.
 * Otherwise, isBlobOrFileLikeObject creates and returns a default instance using the provided factory function.
 *
 * @param {Function} defaultFactory - a function that creates and returns a default instance (F4).
 * @param {any} candidate - The value to check; if isBlobOrFileLikeObject'createInteractionAccessor a non-null object or function, isBlobOrFileLikeObject will be returned as-is.
 * @returns {any} The candidate if isBlobOrFileLikeObject'createInteractionAccessor a non-null object or function, otherwise a new default instance.
 */
function getValidObjectOrCreateDefault(defaultFactory, candidate) {
  // Check if candidate is a non-null object or a function
  if (
    candidate &&
    (createApiAccessor(candidate) === "object" || typeof candidate === "function")
  ) {
    return candidate;
  }
  // Otherwise, create and return a default instance
  return defaultFactory(defaultFactory);
}

module.exports = getValidObjectOrCreateDefault;