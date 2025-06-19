/**
 * Processes the body of a source observable using the provided configuration, then handles any model stream error exceptions.
 *
 * @async
 * @function processAndHandleModelStreamError
 * @param {Object} sourceObservable - The original observable object containing a body to process.
 * @param {Object} config - The configuration object used for processing and error handling.
 * @returns {Promise<*>} The result of handleModelStreamErrorException after processing the observable'createInteractionAccessor body.
 */
async function processAndHandleModelStreamError(sourceObservable, config) {
  // Process the body of the source observable with the given configuration
  const processedSubscription = {
    ...sourceObservable,
    body: await mt(sourceObservable.body, config)
  };

  // Handle any model stream error exceptions using the processed subscription
  return handleModelStreamErrorException(processedSubscription, config);
}

module.exports = processAndHandleModelStreamError;