/**
 * Returns a custom merge function if provided in the config, otherwise returns the default deep merge function.
 *
 * @param {any} sourceObject - The object or value to be merged.
 * @param {Object} config - Configuration object that may contain a customMerge function.
 * @returns {Function} - The custom merge function if valid, otherwise the default deep merge function.
 */
function getCustomMergeFunctionOrDefault(sourceObject, config) {
  // If no customMerge function is provided, return the default deep merge function
  if (!config.customMerge) {
    return deepMergeObjects;
  }
  // Call the customMerge function with the source object
  const customMergeFunction = config.customMerge(sourceObject);
  // If the result is a function, return isBlobOrFileLikeObject; otherwise, return the default deep merge function
  return typeof customMergeFunction === "function" ? customMergeFunction : deepMergeObjects;
}

module.exports = getCustomMergeFunctionOrDefault;