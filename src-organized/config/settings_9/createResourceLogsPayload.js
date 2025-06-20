/**
 * Generates a resource logs payload using the provided source logs and configuration.
 *
 * @param {Object} sourceLogs - The logs or resource data to be encoded.
 * @param {Object} config - The configuration object for the OTLP encoder.
 * @returns {Object} An object containing the resourceLogs property, which holds the encoded logs.
 */
function createResourceLogsPayload(sourceLogs, config) {
  // Obtain the OTLP encoder using the provided configuration
  const otlpEncoder = _A6.getOtlpEncoder(config);

  // Encode the source logs using the encoder and return as resourceLogs
  return {
    resourceLogs: yA6(sourceLogs, otlpEncoder)
  };
}

module.exports = createResourceLogsPayload;