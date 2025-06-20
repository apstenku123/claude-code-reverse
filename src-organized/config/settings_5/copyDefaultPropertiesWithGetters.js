/**
 * Copies all own properties from the source object and, if provided, the subscription object to the config object as getters, excluding the 'default' property.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the config object as getters.
 * @param {Object} configObject - The target object to which properties will be copied.
 * @param {Object} [subscriptionObject] - Optional. If provided, its properties will also be copied to the config object as getters.
 * @returns {void}
 */
const copyDefaultPropertiesWithGetters = (sourceObject, configObject, subscriptionObject) => {
  // Copy all own properties from sourceObject to configObject as getters, excluding 'default'
  copyPropertiesWithGetters(sourceObject, configObject, "default");

  // If a subscriptionObject is provided, copy its properties as well
  if (subscriptionObject) {
    copyPropertiesWithGetters(subscriptionObject, configObject, "default");
  }
};

module.exports = copyDefaultPropertiesWithGetters;
