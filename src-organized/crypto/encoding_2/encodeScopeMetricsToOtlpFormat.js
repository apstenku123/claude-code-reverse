/**
 * Transforms a metrics data object into the OTLP (OpenTelemetry Protocol) format.
 *
 * @param {Object} metricsData - The metrics data containing resource and scope metrics.
 * @param {Object} otlpConfig - Configuration object used to obtain the OTLP encoder.
 * @returns {Object} An object containing the encoded resource, schemaUrl, and scopeMetrics in OTLP format.
 */
function encodeScopeMetricsToOtlpFormat(metricsData, otlpConfig) {
  // Obtain the OTLP encoder using the provided configuration
  const otlpEncoder = uA6.getOtlpEncoder(otlpConfig);

  return {
    // Encode the resource information using the Is.createResource utility
    resource: Is.createResource(metricsData.resource),
    // Schema URL is not provided in this context
    schemaUrl: undefined,
    // Encode the scope metrics using the OTLP encoder
    scopeMetrics: wR0(metricsData.scopeMetrics, otlpEncoder)
  };
}

module.exports = encodeScopeMetricsToOtlpFormat;