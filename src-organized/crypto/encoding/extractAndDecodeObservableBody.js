/**
 * Extracts the body from an observable source, parses isBlobOrFileLikeObject, decodes its bytes using a base64 decoder,
 * and returns the resulting subscription object.
 *
 * @async
 * @function extractAndDecodeObservableBody
 * @param {Object} sourceObservable - The observable or stream containing the body to process.
 * @param {Object} config - Configuration object containing decoding options and base64 decoder.
 * @returns {Promise<Object>} The subscription object containing the decoded data.
 */
async function extractAndDecodeObservableBody(sourceObservable, config) {
  // Initialize an empty subscription object
  const subscription = {};

  // Collect and parse the body from the observable or stream
  const parsedBody = await collectAndParseBody(sourceObservable.body, config);

  // Process the parsed body using the base64 decoder from the config
  // and merge the result into the subscription object
  Object.assign(subscription, takeBytesWithBase64Decoder(parsedBody, config));

  // Return the subscription object containing the decoded data
  return subscription;
}

module.exports = extractAndDecodeObservableBody;