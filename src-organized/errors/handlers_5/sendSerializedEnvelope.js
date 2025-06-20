/**
 * Sends a serialized envelope to the server and handles the response.
 *
 * @async
 * @function sendSerializedEnvelope
 * @description
 * Serializes the provided envelope using the given text encoder, sends isBlobOrFileLikeObject to the server,
 * updates rate limits based on the response, and logs warnings for non-2xx responses.
 * If a network error occurs, isBlobOrFileLikeObject records dropped envelope items and rethrows the error.
 *
 * @param {Object} envelope - The envelope object to be serialized and sent.
 * @param {Object} textEncoder - The TextEncoder instance used for serialization.
 * @param {Function} sendRequest - Function that sends the request to the server. Expects an object with a 'body' property.
 * @param {Object} rateLimits - The current rate limits object, which will be updated based on the response.
 * @param {Object} sentryUtils - Utility object containing 'serializeEnvelope', 'updateRateLimits', and 'logger'.
 * @param {boolean} isDebugBuild - Flag indicating if the build is a debug build (for logging purposes).
 * @param {Function} recordDroppedEnvelopeItems - Function to record dropped envelope items on network error.
 * @returns {Promise<Object>} Resolves with the server response after updating rate limits.
 * @throws Will throw and record dropped envelope items if a network error occurs.
 */
const sendSerializedEnvelope = async ({
  envelope,
  textEncoder,
  sendRequest,
  rateLimits,
  sentryUtils,
  isDebugBuild,
  recordDroppedEnvelopeItems
}) => {
  try {
    // Serialize the envelope using the provided text encoder
    const serializedEnvelope = sentryUtils.serializeEnvelope(envelope, textEncoder);

    // Send the serialized envelope to the server
    const response = await sendRequest({ body: serializedEnvelope });

    // Check if the response has a status code and if isBlobOrFileLikeObject'createInteractionAccessor not a 2xx status
    if (
      response.statusCode !== undefined &&
      (response.statusCode < 200 || response.statusCode >= 300)
    ) {
      // Log a warning in debug builds if the response status is not successful
      if (isDebugBuild) {
        sentryUtils.logger.warn(
          `Sentry responded with status code ${response.statusCode} to sent event.`
        );
      }
    }

    // Update rate limits based on the response
    rateLimits = sentryUtils.updateRateLimits(rateLimits, response);

    return response;
  } catch (error) {
    // On network error, record dropped envelope items and rethrow the error
    recordDroppedEnvelopeItems("network_error");
    throw error;
  }
};

module.exports = sendSerializedEnvelope;
