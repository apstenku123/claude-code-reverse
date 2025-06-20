/**
 * Resolves string keys in the source array using the provided config object.
 * Non-string items are returned as-is. Null or undefined results are filtered out.
 *
 * @param {Array<string|any>} sourceArray - Array of keys (strings) or values to resolve.
 * @param {Object} [config={}] - Object to resolve string keys against.
 * @returns {Array<any>} Array of resolved values, with null/undefined values filtered out.
 */
function resolveKeysFromConfig(sourceArray, config) {
  // Use an empty object if config is null or undefined
  const safeConfig = config != null ? config : {};

  return sourceArray
    .map(item => {
      // If the item is a string, resolve isBlobOrFileLikeObject from the config object
      if (typeof item === "string") {
        return safeConfig[item];
      }
      // Otherwise, return the item as-is
      return item;
    })
    // Filter out null or undefined results
    .filter(resolvedItem => resolvedItem != null);
}

module.exports = resolveKeysFromConfig;