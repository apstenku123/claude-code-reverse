/**
 * Sets and normalizes options for the interaction filter accessor.
 *
 * This function processes the provided options object, applies default values for missing properties,
 * and assigns the resulting configuration to the instance. It ensures that the options object
 * includes all necessary properties, using defaults from the global iF1 object when not provided.
 *
 * @param {Object} [options={}] - The options object to configure the interaction filter accessor.
 * @param {Object} [options.whiteList] - List of allowed items (defaults to iF1.whiteList).
 * @param {Function} [options.onAttr] - Callback for attribute processing (defaults to iF1.onAttr).
 * @param {Function} [options.onIgnoreAttr] - Callback for ignored attributes (defaults to iF1.onIgnoreAttr).
 * @param {Function} [options.safeAttrValue] - Function to sanitize attribute values (defaults to iF1.safeAttrValue).
 * @returns {void}
 */
function setInteractionFilterOptions(options = {}) {
  // Normalize and process the options object using shallowCloneObject
  const normalizedOptions = shallowCloneObject(options);

  // Assign default values from iF1 if not provided in options
  normalizedOptions.whiteList = normalizedOptions.whiteList || iF1.whiteList;
  normalizedOptions.onAttr = normalizedOptions.onAttr || iF1.onAttr;
  normalizedOptions.onIgnoreAttr = normalizedOptions.onIgnoreAttr || iF1.onIgnoreAttr;
  normalizedOptions.safeAttrValue = normalizedOptions.safeAttrValue || iF1.safeAttrValue;

  // Store the final options on the instance
  this.options = normalizedOptions;
}

module.exports = setInteractionFilterOptions;