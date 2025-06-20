/**
 * Creates a connection handler based on the configuration provided.
 * If the configuration specifies exactly one connection, an exclusive connection handler is created.
 * Otherwise, a shared connection handler is created.
 *
 * @param {Object} sourceObservable - The observable or data source to be handled.
 * @param {Object} config - Configuration object that may contain a 'connections' property.
 * @returns {Object} An instance of either XV6 (exclusive handler) or JV6 (shared handler), depending on the configuration.
 */
function createConnectionHandler(sourceObservable, config) {
  // If config exists and specifies exactly one connection, use the exclusive handler
  if (config && config.connections === 1) {
    return new XV6(sourceObservable, config);
  }
  // Otherwise, use the shared handler
  return new JV6(sourceObservable, config);
}

module.exports = createConnectionHandler;