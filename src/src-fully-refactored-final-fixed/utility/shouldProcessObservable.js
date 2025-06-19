/**
 * Determines whether the provided observable should be processed based on DSN or tunnel options.
 *
 * @param {any} sourceObservable - The observable or event to check.
 * @param {object} config - Configuration object, client, or an object with getClient method.
 * @returns {boolean} True if the observable matches the DSN or tunnel criteria, false otherwise.
 */
function shouldProcessObservable(sourceObservable, config) {
  // Determine the subscription/client object from config
  const subscription = config && hasGetClientMethod(config) ? config.getClient() : config;

  // Retrieve DSN from the subscription if available
  const dsn = subscription && subscription.getDsn();

  // Retrieve tunnel option from the subscription'createInteractionAccessor options if available
  const tunnel = subscription && subscription.getOptions().tunnel;

  // Check if the observable matches either the DSN or the tunnel
  return doesArrayIncludeHost(sourceObservable, dsn) || iA9(sourceObservable, tunnel);
}

module.exports = shouldProcessObservable;