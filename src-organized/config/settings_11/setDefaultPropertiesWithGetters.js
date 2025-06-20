/**
 * Copies all own properties (except 'default') from the sourceObservable and optional subscription objects
 * to the config object as getters, only if they do not already exist on config. Preserves enumerability.
 *
 * @param {Object} sourceObservable - The primary source object whose properties will be copied to config.
 * @param {Object} config - The target object to receive missing properties as getters.
 * @param {Object} [subscription] - Optional secondary source object whose properties will also be copied to config.
 * @returns {void}
 */
const copyMissingPropertiesWithGetters = require('utils/type_4/copyMissingPropertiesWithGetters');

function setDefaultPropertiesWithGetters(sourceObservable, config, subscription) {
  // Copy all own properties (except 'default') from sourceObservable to config as getters
  copyMissingPropertiesWithGetters(sourceObservable, config, 'default');

  // If subscription is provided, copy its properties as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, 'default');
  }
}

module.exports = setDefaultPropertiesWithGetters;