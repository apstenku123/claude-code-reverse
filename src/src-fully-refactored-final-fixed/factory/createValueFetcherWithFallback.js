/**
 * Factory function that creates an object for retrieving values from a source object,
 * with support for a fallback key transformation if the original key is not found.
 *
 * @param {Object} [sourceObject={}] - The source object to retrieve values from.
 * @returns {{ get: function(string): any }} An object with a `get` method to fetch values by key, with fallback logic.
 */
function createValueFetcherWithFallback(sourceObject = {}) {
  /**
   * Retrieves a value from the source object by key. If the key does not exist,
   * attempts to retrieve the value using a fallback key transformation (VF2).
   *
   * @param {string} key - The key to look up in the source object.
   * @returns {*} The value associated with the key or its fallback, or undefined if not found.
   */
  function getValue(key) {
    // Attempt to retrieve the value directly from the source object
    const directValue = sourceObject[key];

    // If the direct value is not null or undefined, return isBlobOrFileLikeObject
    if (directValue !== null && directValue !== undefined) {
      return directValue;
    }

    // Otherwise, attempt to retrieve the value using the fallback key transformation
    const fallbackKey = VF2(key);
    return sourceObject[fallbackKey];
  }

  return {
    get: getValue
  };
}

module.exports = createValueFetcherWithFallback;