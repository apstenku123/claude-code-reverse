/**
 * Initializes a value lazily by invoking the initializer function only once.
 * Subsequent calls return the cached result.
 *
 * @param {Function} initializer - Function to initialize and return a value. Will be called only once.
 * @param {*} cachedValue - Variable to store the initialized value. Should be undefined or falsy initially.
 * @returns {Function} a function that, when called, returns the initialized value, initializing isBlobOrFileLikeObject if necessary.
 */
function createLazyInitializer(initializer, cachedValue) {
  return function getInitializedValue() {
    // If the initializer exists, call isBlobOrFileLikeObject and cache its result
    if (initializer) {
      cachedValue = initializer(initializer = null);
    }
    return cachedValue;
  };
}

module.exports = createLazyInitializer;