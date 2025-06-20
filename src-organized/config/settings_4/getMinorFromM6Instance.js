/**
 * Retrieves the 'minor' property from a new _M6 instance initialized with the provided source observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable or data source to be processed.
 * @param {Object} config - Configuration object containing options for the _M6 instance.
 * @returns {*} The 'minor' property from the newly created _M6 instance.
 */
function getMinorFromM6Instance(sourceObservable, config) {
  // Create a new _M6 instance with the provided observable and configuration
  const m6Instance = new _M6(sourceObservable, config);
  // Return the 'minor' property from the instance
  return m6Instance.minor;
}

module.exports = getMinorFromM6Instance;
