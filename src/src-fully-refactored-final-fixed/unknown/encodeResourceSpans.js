/**
 * Encodes resource spans using the provided source data and configuration.
 *
 * @param {Object} sourceData - The source data to be encoded as resource spans.
 * @param {Object} encoderConfig - Configuration object for the OTLP encoder.
 * @returns {Object} An object containing the encoded resource spans.
 */
function encodeResourceSpans(sourceData, encoderConfig) {
  // Obtain the OTLP encoder instance using the provided configuration
  const otlpEncoder = Q06.getOtlpEncoder(encoderConfig);

  // Encode the resource spans using the source data and the encoder
  return {
    resourceSpans: transformResourceSpans(sourceData, otlpEncoder)
  };
}

module.exports = encodeResourceSpans;