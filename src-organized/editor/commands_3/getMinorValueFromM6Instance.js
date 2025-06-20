/**
 * Retrieves the 'minor' property from a new _M6 instance initialized with the provided parameters.
 *
 * @param {Array} interactionEntries - An array of user interaction entries to be mapped to routes.
 * @param {Object} activityConfig - Configuration object for adding an activity if not finished.
 * @returns {*} The 'minor' property of the created _M6 instance.
 */
function getMinorValueFromM6Instance(interactionEntries, activityConfig) {
  // Create a new _M6 instance with the provided interaction entries and activity configuration
  const m6Instance = new _M6(interactionEntries, activityConfig);

  // Return the 'minor' property from the _M6 instance
  return m6Instance.minor;
}

module.exports = getMinorValueFromM6Instance;