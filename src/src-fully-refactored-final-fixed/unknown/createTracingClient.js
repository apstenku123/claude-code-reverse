/**
 * Creates a new tracing client instance with optional breadcrumbs and tracing configuration.
 *
 * @param {Object} [options={}] - Configuration options for the tracing client.
 * @param {Array} [options.breadcrumbs] - An array of breadcrumb objects for logging or debugging.
 * @param {boolean} [options.tracing] - Flag to enable or disable tracing. If false, disables tracing. If true, enables tracing.
 * @param {Function} [options.shouldCreateSpanForRequest] - Optional function to determine if a span should be created for a request.
 * @returns {CP} a new instance of the tracing client (CP) configured with the provided options.
 */
function createTracingClient(options = {}) {
  const {
    breadcrumbs,
    tracing,
    shouldCreateSpanForRequest
  } = options;

  // Prepare the configuration object for the tracing client
  const tracingClientConfig = {
    breadcrumbs,
    tracing: tracing === false
      ? false
      : tW.dropUndefinedKeys({
          // Only set 'enableIfHasTracingEnabled' if tracing is not explicitly true
          enableIfHasTracingEnabled: tracing === true ? undefined : true,
          shouldCreateSpanForRequest
        })
  };

  // Instantiate and return the tracing client
  return new CP(tracingClientConfig);
}

module.exports = createTracingClient;
