/**
 * Merges an array of option objects into a single configuration object, handling 'uninterpreted_option' specially.
 *
 * Each object in the input array may have various properties. The 'uninterpreted_option' property, if present, is collected into an array.
 * Other properties are assigned directly to the resulting configuration object.
 *
 * @param {Array<Object>} optionsArray - Array of option objects to merge.
 * @returns {Object} The merged configuration object with collected 'uninterpreted_option' values.
 */
function mergeOptionsWithUninterpreted(optionsArray) {
  return (optionsArray || []).reduce((mergedConfig, optionObject) => {
    // Iterate over each property in the current option object
    for (const [propertyKey, propertyValue] of Object.entries(optionObject)) {
      switch (propertyKey) {
        case "uninterpreted_option":
          // Collect all 'uninterpreted_option' values into an array
          mergedConfig.uninterpreted_option.push(optionObject.uninterpreted_option);
          break;
        default:
          // Assign other properties directly to the merged config
          mergedConfig[propertyKey] = propertyValue;
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

module.exports = mergeOptionsWithUninterpreted;