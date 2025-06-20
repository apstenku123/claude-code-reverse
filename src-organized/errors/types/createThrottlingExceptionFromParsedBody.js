/**
 * Creates a ThrottlingException from a parsed HTTP response body and AWS metadata.
 *
 * This function collects and parses the body from the provided source observable or stream,
 * then constructs a ThrottlingException using the parsed body and additional configuration/metadata.
 *
 * @async
 * @param {Object} sourceObservable - The HTTP response or observable containing the body to parse.
 * @param {Object} config - Configuration or AWS metadata used to decorate the ThrottlingException.
 * @returns {Promise<any>} The constructed ThrottlingException object.
 */
async function createThrottlingExceptionFromParsedBody(sourceObservable, config) {
  // Collect and parse the body from the source observable/stream
  const parsedBody = await collectAndParseBody(sourceObservable.body, config);

  // Create a new object combining the original observable and the parsed body
  const subscription = {
    ...sourceObservable,
    body: parsedBody
  };

  // Create and return the ThrottlingException using the decorated subscription and config
  return createThrottlingExceptionFromBody(subscription, config);
}

module.exports = createThrottlingExceptionFromParsedBody;