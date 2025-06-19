/**
 * Creates a new instance of the CP client processor with the provided configuration.
 *
 * @param {Object} options - Configuration options for the client processor.
 * @param {Object} [options.breadcrumbs] - Breadcrumbs configuration object.
 * @param {boolean} [options.tracing] - Whether tracing is enabled.
 * @param {Function} [options.shouldCreateSpanForRequest] - Function to determine if a span should be created for a request.
 * @returns {CP} a new instance of the CP client processor configured as specified.
 */
function createClientProcessor(options = {}) {
  const {
    breadcrumbs: breadcrumbsConfig,
    tracing: isTracingEnabled,
    shouldCreateSpanForRequest
  } = options;

  // Prepare the configuration object for the CP constructor
  const clientProcessorConfig = {
    breadcrumbs: breadcrumbsConfig,
    tracing: isTracingEnabled === false ? false : tW.dropUndefinedKeys({
      // If tracing is explicitly true, do not set enableIfHasTracingEnabled
      enableIfHasTracingEnabled: isTracingEnabled === true ? undefined : true,
      shouldCreateSpanForRequest: shouldCreateSpanForRequest
    })
  };

  // Instantiate and return the CP client processor
  return new CP(clientProcessorConfig);
}

module.exports = createClientProcessor;
