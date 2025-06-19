/**
 * Generates a resourceLogs object from a source observable using a specified configuration.
 *
 * @param {Object} sourceObservable - The observable or data source to extract logs from.
 * @param {Object} config - The configuration object used to obtain the OTLP encoder.
 * @returns {Object} An object containing the resourceLogs generated from the source observable.
 */
function createResourceLogsFromObservable(sourceObservable, config) {
  // Obtain the OTLP encoder using the provided configuration
  const otlpEncoder = _A6.getOtlpEncoder(config);

  // Generate resource logs from the source observable using the encoder
  return {
    resourceLogs: yA6(sourceObservable, otlpEncoder)
  };
}

module.exports = createResourceLogsFromObservable;