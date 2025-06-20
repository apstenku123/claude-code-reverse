/**
 * Determines whether a request should be processed based on the provided observable and configuration.
 *
 * This utility checks if the observable matches either the DSN or tunnel configuration
 * from the provided config object or its client (if available).
 *
 * @param {any} sourceObservable - The observable or request to check.
 * @param {object} [config] - Optional configuration object or client provider.
 * @returns {boolean} True if the request should be processed, false otherwise.
 */
function shouldProcessRequest(sourceObservable, config) {
  // If config is provided and has a getClient method (checked by hasGetClientMethod), use the client; otherwise, use config directly
  const subscription = config && hasGetClientMethod(config) ? config.getClient() : config;

  // Retrieve DSN from the subscription/client if available
  const dsn = subscription && subscription.getDsn();

  // Retrieve tunnel option from the subscription/client if available
  const tunnel = subscription && subscription.getOptions().tunnel;

  // Check if the observable matches the DSN or the tunnel
  return doesArrayIncludeHost(sourceObservable, dsn) || iA9(sourceObservable, tunnel);
}

module.exports = shouldProcessRequest;