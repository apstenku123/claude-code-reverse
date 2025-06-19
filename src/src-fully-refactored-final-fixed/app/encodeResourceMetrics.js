/**
 * Encodes resource metrics using the provided configuration and returns an object
 * containing the encoded resource, schema URL, and scope metrics.
 *
 * @param {Object} resourceMetrics - The resource metrics object to encode. Should contain 'resource' and 'scopeMetrics' properties.
 * @param {Object} encoderConfig - The configuration object used to obtain the OTLP encoder.
 * @returns {Object} An object with encoded resource, schemaUrl (always undefined), and encoded scope metrics.
 */
function encodeResourceMetrics(resourceMetrics, encoderConfig) {
  // Obtain the OTLP encoder using the provided configuration
  const otlpEncoder = uA6.getOtlpEncoder(encoderConfig);

  return {
    // Encode the resource using the external Is.createResource function
    resource: Is.createResource(resourceMetrics.resource),
    // Schema URL is not provided, so set to undefined
    schemaUrl: undefined,
    // Encode the scope metrics using the external wR0 function and the OTLP encoder
    scopeMetrics: wR0(resourceMetrics.scopeMetrics, otlpEncoder)
  };
}

module.exports = encodeResourceMetrics;