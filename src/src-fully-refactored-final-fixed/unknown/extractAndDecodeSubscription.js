/**
 * Extracts and decodes a subscription object from a source observable using a provided configuration.
 *
 * This function collects and parses the body from the source observable or stream, then applies a base64 decoder
 * operation (via the configuration) to the parsed result. The decoded properties are merged into a new subscription object.
 *
 * @async
 * @param {Object} sourceObservable - The observable or stream containing the body to be processed.
 * @param {Object} config - Configuration object containing decoding functions and options.
 * @returns {Promise<Object>} The resulting subscription object with decoded properties.
 */
async function extractAndDecodeSubscription(sourceObservable, config) {
  // Initialize an empty subscription object
  const subscription = {};

  // Collect and parse the body from the source observable/stream
  const parsedBody = await collectAndParseBody(sourceObservable.body, config);

  // Apply the base64 decoder operation and merge the result into the subscription object
  Object.assign(subscription, takeWithBase64Decoder(parsedBody, config));

  return subscription;
}

// Dependency imports (assumed to be defined elsewhere in the codebase)
// const collectAndParseBody = require('./mt');
// const takeWithBase64Decoder = require('./lr6');

module.exports = extractAndDecodeSubscription;