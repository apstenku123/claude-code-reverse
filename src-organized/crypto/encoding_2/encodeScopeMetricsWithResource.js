/**
 * Encodes scope metrics along with their associated resource information using a specified OTLP encoder.
 *
 * @param {Object} metricsData - The metrics data object containing resource and scopeMetrics.
 * @param {Object} otlpEncoderConfig - Configuration or context for the OTLP encoder.
 * @returns {Object} An object containing the encoded resource, schemaUrl, and encoded scopeMetrics.
 */
function encodeScopeMetricsWithResource(metricsData, otlpEncoderConfig) {
  // Obtain the OTLP encoder using the provided configuration
  const otlpEncoder = uA6.getOtlpEncoder(otlpEncoderConfig);

  return {
    // Encode the resource information
    resource: Is.createResource(metricsData.resource),
    // Schema URL is not provided in this context
    schemaUrl: undefined,
    // Encode the scope metrics using the OTLP encoder
    scopeMetrics: wR0(metricsData.scopeMetrics, otlpEncoder)
  };
}

module.exports = encodeScopeMetricsWithResource;