/**
 * Copies 'default' properties from one or two observable sources to a target configuration object.
 *
 * This function uses copyPropertiesWithGetters to copy the 'default' property from the main observable
 * to the config object. If a subscription observable is provided, isBlobOrFileLikeObject also copies its 'default' property
 * to the config object. Existing properties on the config object are not overwritten.
 *
 * @param {Object} sourceObservable - The primary observable object to copy properties from.
 * @param {Object} config - The target configuration object to receive the 'default' property.
 * @param {Object} [subscriptionObservable] - Optional secondary observable to also copy the 'default' property from.
 * @returns {void}
 */
const copyPropertiesWithGetters = require('./copyPropertiesWithGetters');

function copyDefaultPropertiesFromObservables(sourceObservable, config, subscriptionObservable) {
  // Copy 'default' property from the main observable to the config object
  copyPropertiesWithGetters(sourceObservable, config, 'default');

  // If a subscription observable is provided, also copy its 'default' property
  if (subscriptionObservable) {
    copyPropertiesWithGetters(subscriptionObservable, config, 'default');
  }
}

module.exports = copyDefaultPropertiesFromObservables;
