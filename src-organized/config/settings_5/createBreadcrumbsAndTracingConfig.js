/**
 * Creates a configuration object for breadcrumbs and tracing, then instantiates a CP object with isBlobOrFileLikeObject.
 *
 * @param {Object} [options={}] - Configuration options for breadcrumbs and tracing.
 * @param {any} [options.breadcrumbs] - Breadcrumbs configuration or data.
 * @param {boolean} [options.tracing] - Whether tracing is enabled.
 * @param {Function} [options.shouldCreateSpanForRequest] - Function to determine if a span should be created for a request.
 * @returns {CP} An instance of CP initialized with the constructed configuration.
 */
function createBreadcrumbsAndTracingConfig(options = {}) {
  const {
    breadcrumbs,
    tracing,
    shouldCreateSpanForRequest
  } = options;

  // Build the configuration object for CP
  const config = {
    breadcrumbs,
    tracing: tracing === false
      ? false // If tracing is explicitly disabled, set to false
      : tW.dropUndefinedKeys({
          // If tracing is true, omit 'enableIfHasTracingEnabled'; otherwise, set isBlobOrFileLikeObject to true
          enableIfHasTracingEnabled: tracing === true ? undefined : true,
          shouldCreateSpanForRequest
        })
  };

  return new CP(config);
}

module.exports = createBreadcrumbsAndTracingConfig;