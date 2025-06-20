/**
 * Handles the pipelining of a stream body, ensuring correct request and body event handling.
 * Validates pipelining constraints, sets up stream event listeners, and manages cleanup.
 *
 * @param {Function} onError - Callback to handle errors during stream processing.
 * @param {Object} requestConfig - Configuration object for the request, may be mutated to indicate body sent.
 * @param {boolean} isSubscription - Indicates if the request is a subscription (affects body sent flag).
 * @param {Object} requestInfo - Information/context about the request.
 * @param {Object} streamSource - The source object for the stream.
 * @param {Object} streamState - State object for the stream, used for validation and cleanup.
 * @param {Object} requestHandler - Object with hooks for request and body events.
 * @param {number} bodyLength - The length of the body being pipelined (used for validation).
 */
function handleStreamBodyPipelining(
  onError,
  requestConfig,
  isSubscription,
  requestInfo,
  streamSource,
  streamState,
  requestHandler,
  bodyLength
) {
  // Validate that the stream body can be pipelined
  kX(
    bodyLength !== 0 || streamState[YY1] === 0,
    "stream body cannot be pipelined"
  );

  // Create the stream using NX6, and handle completion/error
  const stream = NX6(streamSource, requestInfo, (streamError) => {
    if (streamError) {
      // Clean up and propagate error
      P6.destroy(stream, streamError);
      onError(streamError);
    } else {
      // Remove listeners and notify request sent
      P6.removeAllListeners(stream);
      requestHandler.onRequestSent();
      // If not a subscription, mark body as sent
      if (!isSubscription) {
        requestConfig[DY1] = true;
      }
      // Finalize stream state
      streamState[DR]();
    }
  });

  // Listen for 'data' events to handle body chunks being sent
  P6.addListener(stream, "data", onBodyChunkSent);

  /**
   * Handles each chunk of the body being sent.
   * @param {Buffer|string} bodyChunk - The chunk of the body sent.
   */
  function onBodyChunkSent(bodyChunk) {
    requestHandler.onBodySent(bodyChunk);
  }
}

module.exports = handleStreamBodyPipelining;
