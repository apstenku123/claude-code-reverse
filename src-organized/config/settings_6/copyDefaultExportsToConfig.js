/**
 * Copies the 'default' property from the sourceObservable and, if provided, from the subscription
 * to the config object using getters, ensuring existing properties are not overwritten.
 *
 * @param {Object} sourceObservable - The primary source object whose 'default' property will be copied.
 * @param {Object} config - The target configuration object to which properties will be copied.
 * @param {Object} [subscription] - Optional. An additional source object whose 'default' property will also be copied.
 * @returns {void}
 */
function copyDefaultExportsToConfig(sourceObservable, config, subscription) {
  // Copy the 'default' property from sourceObservable to config
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription is provided, copy its 'default' property to config as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
}

module.exports = copyDefaultExportsToConfig;