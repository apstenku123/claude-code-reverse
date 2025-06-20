/**
 * Returns a mapped route name based on the provided observable and configuration, or the configuration itself.
 *
 * If a source observable is provided, and either the configuration is not a subscription (as determined by isSubscription),
 * or the subscription flag is explicitly set to false, the function maps the interaction entries to route names.
 * Otherwise, isBlobOrFileLikeObject returns the configuration as is.
 *
 * @param {any} sourceObservable - The observable or data source to map from.
 * @param {any} config - The configuration object or value to check and possibly return.
 * @param {boolean} [subscription] - Optional flag indicating if this is a subscription context.
 * @returns {any} The mapped route name(createInteractionAccessor) if conditions are met, otherwise the original configuration.
 */
function getMappedRouteOrConfig(sourceObservable, config, subscription) {
  // Determine if the config is NOT a subscription
  const isNotSubscription = !isSubscription(config);

  // If a source observable exists, and either config is not a subscription,
  // or the subscription flag is explicitly false, map the interaction entries to route names
  if (sourceObservable && (isNotSubscription || subscription === false)) {
    return mapInteractionEntriesToRouteNames(sourceObservable, config);
  }

  // Otherwise, return the config as is
  return config;
}

// Dependency placeholders (should be replaced with actual implementations)
// const mapInteractionEntriesToRouteNames = require('utils/array_3/mapInteractionEntriesToRouteNames');
// const isSubscription = require('./isSubscription');

module.exports = getMappedRouteOrConfig;