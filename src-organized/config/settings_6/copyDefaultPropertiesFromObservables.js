/**
 * Copies missing 'default' properties from one or two source observables to a target configuration object.
 *
 * Utilizes copyMissingPropertiesWithGetters to copy all own properties (as getters) from the source observable(createInteractionAccessor)
 * to the config object, excluding properties that already exist on the config or those matching the excluded key ('default').
 *
 * @param {Object} sourceObservable - The primary source observable object to copy properties from.
 * @param {Object} config - The target configuration object to which properties are copied.
 * @param {Object} [subscription] - Optional secondary source observable to copy properties from.
 * @returns {void}
 */
function copyDefaultPropertiesFromObservables(sourceObservable, config, subscription) {
  // Copy 'default' property from the primary source observable to config
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription is provided, also copy its 'default' property to config
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
}

module.exports = copyDefaultPropertiesFromObservables;