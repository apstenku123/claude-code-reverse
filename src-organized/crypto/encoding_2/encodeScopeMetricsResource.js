/**
 * Encodes scope metrics and resource information using the provided configuration.
 *
 * @param {Object} metricsData - The metrics data object containing resource and scopeMetrics.
 * @param {Object} encoderConfig - The configuration object for the OTLP encoder.
 * @returns {Object} An object containing the encoded resource, schemaUrl, and encoded scopeMetrics.
 */
function encodeScopeMetricsResource(metricsData, encoderConfig) {
  // Retrieve the OTLP encoder based on the provided configuration
  const otlpEncoder = uA6.getOtlpEncoder(encoderConfig);

  return {
    // Encode the resource using the Is.createResource method
    resource: Is.createResource(metricsData.resource),
    // schemaUrl is not provided in this context
    schemaUrl: undefined,
    // Encode the scopeMetrics using the wR0 function and the OTLP encoder
    scopeMetrics: wR0(metricsData.scopeMetrics, otlpEncoder)
  };
}

module.exports = encodeScopeMetricsResource;