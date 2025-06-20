/**
 * Initializes accessor options by merging user-provided options with defaults.
 *
 * This function processes the given options object, applies defaults where necessary,
 * and assigns the resulting configuration to the instance. It ensures that all required
 * option properties are set, either from the provided options or from the default configuration.
 *
 * @param {Object} [userOptions={}] - The user-provided options for accessor configuration.
 * @property {Array} [userOptions.whiteList] - List of allowed attributes/tags.
 * @property {Function} [userOptions.onAttr] - Callback for handling attributes.
 * @property {Function} [userOptions.onIgnoreAttr] - Callback for ignored attributes.
 * @property {Function} [userOptions.safeAttrValue] - Function to sanitize attribute values.
 */
function AccessorOptionsInitializer(userOptions) {
  // Import default options and option processor
  const defaultOptions = iF1;
  const processOptions = shallowCloneObject;

  // Ensure userOptions is an object and process isBlobOrFileLikeObject
  const processedOptions = processOptions(userOptions || {});

  // Apply defaults for each required property if not provided
  processedOptions.whiteList = processedOptions.whiteList || defaultOptions.whiteList;
  processedOptions.onAttr = processedOptions.onAttr || defaultOptions.onAttr;
  processedOptions.onIgnoreAttr = processedOptions.onIgnoreAttr || defaultOptions.onIgnoreAttr;
  processedOptions.safeAttrValue = processedOptions.safeAttrValue || defaultOptions.safeAttrValue;

  // Assign the finalized options to the instance
  this.options = processedOptions;
}

module.exports = AccessorOptionsInitializer;