/**
 * Sets default properties from the source observable and optional subscription onto the config object.
 *
 * Copies all own property keys from the sourceObservable to the config object as getter properties, excluding the key 'default' and any keys already present on the config. If a subscription is provided, its properties are also copied in the same way.
 *
 * @param {Object} sourceObservable - The object whose properties will be copied as default getters onto the config.
 * @param {Object} config - The target object to receive default getter properties.
 * @param {Object} [subscription] - Optional. An additional object whose properties will also be copied as default getters onto the config.
 * @returns {void}
 */
function setDefaultAccessor(sourceObservable, config, subscription) {
  // Copy all properties from sourceObservable to config as getters, excluding 'default'
  copyPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription is provided, copy its properties as well
  if (subscription) {
    copyPropertiesWithGetters(subscription, config, "default");
  }
}

module.exports = setDefaultAccessor;