/**
 * Sets and normalizes the options for the IF1 accessor, ensuring all required properties are present.
 *
 * @param {Object} [options={}] - The options object to configure IF1 behavior.
 * @param {Object} [options.whiteList] - Optional whitelist of allowed attributes/tags.
 * @param {Function} [options.onAttr] - Optional callback for handling attributes.
 * @param {Function} [options.onIgnoreAttr] - Optional callback for ignored attributes.
 * @param {Function} [options.safeAttrValue] - Optional function to sanitize attribute values.
 * @returns {void}
 */
function setIF1Options(options = {}) {
  // Normalize the options object using shallowCloneObject, which may apply defaults or transformations
  const normalizedOptions = shallowCloneObject(options);

  // Ensure whiteList is set, defaulting to iF1.whiteList if not provided
  normalizedOptions.whiteList = normalizedOptions.whiteList || iF1.whiteList;

  // Ensure onAttr callback is set, defaulting to iF1.onAttr if not provided
  normalizedOptions.onAttr = normalizedOptions.onAttr || iF1.onAttr;

  // Ensure onIgnoreAttr callback is set, defaulting to iF1.onIgnoreAttr if not provided
  normalizedOptions.onIgnoreAttr = normalizedOptions.onIgnoreAttr || iF1.onIgnoreAttr;

  // Ensure safeAttrValue function is set, defaulting to iF1.safeAttrValue if not provided
  normalizedOptions.safeAttrValue = normalizedOptions.safeAttrValue || iF1.safeAttrValue;

  // Store the fully prepared options on the instance
  this.options = normalizedOptions;
}

module.exports = setIF1Options;