/**
 * Copies enumerable properties from source objects to a target config object,
 * defining getters for properties that do not already exist on the config,
 * except for the property named "default".
 *
 * @param {object} sourceObservable - The primary source object whose properties will be defined on the config object.
 * @param {object} config - The target object to which properties will be defined if missing.
 * @param {object} [subscription] - An optional secondary source object whose properties will also be defined on the config object.
 * @returns {void}
 */
const defineDefaultPropertiesFromSources = (sourceObservable, config, subscription) => {
  // Define missing properties from sourceObservable to config, excluding 'default'
  defineMissingPropertiesFromSource(sourceObservable, config, "default");

  // If a subscription object is provided, define its missing properties as well
  if (subscription) {
    defineMissingPropertiesFromSource(subscription, config, "default");
  }
};

module.exports = defineDefaultPropertiesFromSources;