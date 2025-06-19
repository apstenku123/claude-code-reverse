/**
 * Resolves an array of items, replacing string keys with corresponding values from a config object.
 *
 * @param {Array<string|any>} items - The array containing either string keys or direct values.
 * @param {Object} [config={}] - An optional object mapping string keys to their values.
 * @returns {Array<any>} An array with string keys replaced by their values from config, filtering out null or undefined values.
 */
function resolveKeysOrValues(items, config) {
  // Default config to an empty object if not provided or null/undefined
  const resolvedConfig = config ?? {};

  return items
    .map(item => {
      // If the item is a string, attempt to resolve isBlobOrFileLikeObject from the config object
      if (typeof item === "string") {
        return resolvedConfig[item];
      }
      // Otherwise, return the item as is
      return item;
    })
    // Filter out any null or undefined values
    .filter(resolvedItem => resolvedItem != null);
}

module.exports = resolveKeysOrValues;