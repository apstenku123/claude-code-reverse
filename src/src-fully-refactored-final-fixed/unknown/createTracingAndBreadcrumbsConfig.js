/**
 * Creates a configuration object for breadcrumbs and tracing, then instantiates a CP object with isBlobOrFileLikeObject.
 *
 * @param {Object} [options={}] - Configuration options.
 * @param {any} [options.breadcrumbs] - Breadcrumbs configuration or data.
 * @param {boolean} [options.tracing] - Whether tracing is enabled.
 * @param {Function} [options.shouldCreateSpanForRequest] - Function to determine if a span should be created for a request.
 * @returns {CP} An instance of the CP class, initialized with the constructed configuration.
 */
function createTracingAndBreadcrumbsConfig(options = {}) {
  const {
    breadcrumbs,
    tracing,
    shouldCreateSpanForRequest
  } = options;

  // Build the configuration object for CP
  const config = {
    breadcrumbs,
    tracing: tracing === false
      ? false
      : tW.dropUndefinedKeys({
          // If tracing is explicitly true, don'processRuleBeginHandlers set enableIfHasTracingEnabled
          enableIfHasTracingEnabled: tracing === true ? undefined : true,
          shouldCreateSpanForRequest
        })
  };

  // Instantiate and return the CP object with the config
  return new CP(config);
}

module.exports = createTracingAndBreadcrumbsConfig;