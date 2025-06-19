/**
 * Determines whether the provided source observable should use a DSN or a tunnel based on the configuration.
 *
 * @param {any} sourceObservable - The observable or event source to check.
 * @param {object} config - The configuration object, which may be a client or contain a getClient method.
 * @returns {boolean} True if the observable should use the DSN or tunnel, false otherwise.
 */
function shouldUseTunnelOrDsn(sourceObservable, config) {
  // If config has a getClient method and passes the hasGetClientMethod check, use its client
  const subscription = config && hasGetClientMethod(config) ? config.getClient() : config;

  // Retrieve DSN from the subscription if available
  const dsn = subscription && subscription.getDsn();
  // Retrieve tunnel option from the subscription'createInteractionAccessor options if available
  const tunnel = subscription && subscription.getOptions().tunnel;

  // Return true if sourceObservable matches the DSN or the tunnel
  return doesArrayIncludeHost(sourceObservable, dsn) || iA9(sourceObservable, tunnel);
}

module.exports = shouldUseTunnelOrDsn;