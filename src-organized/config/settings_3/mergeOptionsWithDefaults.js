/**
 * Merges an array of option objects into a single configuration object with defaults.
 *
 * Each object in the input array can have various properties. The function specifically
 * collects all 'uninterpreted_option' properties into an array, while other properties
 * overwrite or set their corresponding values in the result. If the input is null or undefined,
 * an empty array is used by default.
 *
 * @param {Array<Object>} optionsArray - Array of option objects to merge.
 * @returns {Object} The merged configuration object with default values and collected uninterpreted options.
 */
function mergeOptionsWithDefaults(optionsArray) {
  return (optionsArray || []).reduce((mergedConfig, currentOption) => {
    // Iterate over each property in the current option object
    for (const [propertyName, propertyValue] of Object.entries(currentOption)) {
      switch (propertyName) {
        case "uninterpreted_option":
          // Collect all uninterpreted_option values into an array
          mergedConfig.uninterpreted_option.push(currentOption.uninterpreted_option);
          break;
        default:
          // For all other properties, set or overwrite the value
          mergedConfig[propertyName] = propertyValue;
      }
    }
    return mergedConfig;
  }, {
    // Default configuration values
    deprecated: false,
    idempotency_level: x_0.IDEMPOTENCY_UNKNOWN,
    uninterpreted_option: []
  });
}

module.exports = mergeOptionsWithDefaults;