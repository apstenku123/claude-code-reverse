/**
 * Returns a bound method from the config object if certain conditions are met.
 *
 * If the config object is falsy, or if the value in the uW1 map for sourceObservable
 * is greater than the value for subscription, returns the fallback value 'zo'.
 * Otherwise, returns the method at config[sourceObservable] bound to the config object.
 *
 * @param {string} sourceObservable - The key representing the method name to retrieve from config.
 * @param {Object} config - The object containing the method to be bound and returned.
 * @param {string} subscription - The key used for comparison in the uW1 map.
 * @returns {*} - The bound method from config, or the fallback value 'zo'.
 */
function getBoundConfigMethodIfValid(sourceObservable, config, subscription) {
  // Check if config is falsy or if the uW1 value for sourceObservable is greater than for subscription
  if (!config || uW1[sourceObservable] > uW1[subscription]) {
    return zo; // Return fallback value
  } else {
    // Return the method from config, bound to config
    return config[sourceObservable].bind(config);
  }
}

module.exports = getBoundConfigMethodIfValid;