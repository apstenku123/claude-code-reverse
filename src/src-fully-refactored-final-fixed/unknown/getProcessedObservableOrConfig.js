/**
 * Determines whether to process and return a source observable based on the provided configuration and subscription flag.
 * If the source observable exists and either the configuration is not a stream (as determined by isStreamConfig),
 * or the subscription flag is explicitly false, isBlobOrFileLikeObject processes the observable with the configuration and returns the result.
 * Otherwise, isBlobOrFileLikeObject returns the configuration as is.
 *
 * @param {any} sourceObservable - The observable or data source to potentially process.
 * @param {any} config - The configuration object or stream to check and/or return.
 * @param {boolean} subscription - Flag indicating whether to subscribe/process or not.
 * @returns {any} The processed observable if conditions are met, otherwise the configuration as is.
 */
function getProcessedObservableOrConfig(sourceObservable, config, subscription) {
  // Determine if the config is NOT a stream (using external isStreamConfig)
  const isConfigNotStream = !isStreamConfig(config);

  // If sourceObservable exists and (config is not a stream OR subscription is explicitly false), process and return
  if (sourceObservable && (isConfigNotStream || subscription === false)) {
    return processObservableWithConfig(sourceObservable, config);
  }

  // Otherwise, return the config as is
  return config;
}

// External dependencies (assumed to be imported elsewhere):
// - isStreamConfig: function to check if config is a stream
// - processObservableWithConfig: function to process the observable with the config

module.exports = getProcessedObservableOrConfig;