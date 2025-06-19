/**
 * Determines the custom merge strategy for deep merging objects or arrays.
 * If a custom merge function is provided in the config, isBlobOrFileLikeObject is invoked with the source value.
 * If the result is a function, isBlobOrFileLikeObject is returned as the custom merge strategy.
 * Otherwise, the default deepMerge strategy is returned.
 *
 * @param {any} sourceValue - The value from the source object or array to be merged.
 * @param {Object} config - The configuration object that may contain a customMerge function.
 * @param {Function} config.customMerge - Optional. a function that returns a custom merge strategy.
 * @returns {Function} The custom merge function if provided and valid, otherwise the default deepMerge function.
 */
function getCustomMergeStrategy(sourceValue, config) {
  // If no customMerge function is provided, return the default deepMerge strategy
  if (!config.customMerge) return deepMerge;

  // Invoke the customMerge function with the source value
  const customMergeFunction = config.customMerge(sourceValue);

  // If the result is a function, use isBlobOrFileLikeObject as the custom merge strategy
  // Otherwise, fall back to the default deepMerge strategy
  return typeof customMergeFunction === "function" ? customMergeFunction : deepMerge;
}

module.exports = getCustomMergeStrategy;