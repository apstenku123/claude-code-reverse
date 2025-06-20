/**
 * Returns a bound method from the config object if certain conditions are met.
 *
 * If the config object is not provided, or if the value in the uW1 map for the sourceKey
 * is greater than the value for the subscriptionKey, returns the default value `zo`.
 * Otherwise, returns the method at sourceKey from the config object, bound to config.
 *
 * @param {string} sourceKey - The key representing the method to retrieve from the config object.
 * @param {Object} config - The object containing the method to bind.
 * @param {string} subscriptionKey - The key used for comparison in the uW1 map.
 * @returns {*} - The bound method if conditions are met, otherwise the default value `zo`.
 */
function getBoundMethodIfValid(sourceKey, config, subscriptionKey) {
  // If config is not provided, or the uW1 value for sourceKey is greater than for subscriptionKey, return zo
  if (!config || uW1[sourceKey] > uW1[subscriptionKey]) {
    return zo;
  }
  // Otherwise, return the method from config at sourceKey, bound to config
  return config[sourceKey].bind(config);
}

module.exports = getBoundMethodIfValid;