/**
 * Handles the streaming of a body through a pipeline, ensuring proper event handling and cleanup.
 * Throws if the stream body cannot be pipelined.
 *
 * @param {Function} onError - Callback to invoke if an error occurs during streaming.
 * @param {Object} responseFlags - Object to set flags on (e.g., marking if body was sent).
 * @param {boolean} isSubscription - Indicates if this is a subscription request.
 * @param {Object} requestInfo - Information about the request (used by NX6).
 * @param {Object} streamSource - Source of the stream (used by NX6).
 * @param {Object} streamState - State object for the stream, with properties for pipeline status and cleanup.
 * @param {Object} requestHandler - Object with hooks for request and body events.
 * @param {number} pipelineIndex - Index or flag indicating pipeline position (used for validation).
 */
function handleStreamBodyPipeline(
  onError,
  responseFlags,
  isSubscription,
  requestInfo,
  streamSource,
  streamState,
  requestHandler,
  pipelineIndex
) {
  // Validate that the stream body can be pipelined
  kX(
    pipelineIndex !== 0 || streamState[YY1] === 0,
    "stream body cannot be pipelined"
  );

  // Create the writable stream using NX6
  const writableStream = NX6(streamSource, requestInfo, (streamError) => {
    if (streamError) {
      // On error, destroy the stream and invoke the error callback
      P6.destroy(writableStream, streamError);
      onError(streamError);
    } else {
      // Clean up listeners and notify that the request was sent
      P6.removeAllListeners(writableStream);
      requestHandler.onRequestSent();
      // If not a subscription, mark the response as having sent the body
      if (!isSubscription) {
        responseFlags[DY1] = true;
      }
      // Perform any additional cleanup on the stream state
      streamState[DR]();
    }
  });

  // Listen for 'data' events to handle body chunks
  P6.addListener(writableStream, "data", onBodyChunkSent);

  /**
   * Handles each chunk of the body as isBlobOrFileLikeObject is sent.
   * @param {Buffer|string} bodyChunk - The chunk of the body being sent.
   */
  function onBodyChunkSent(bodyChunk) {
    requestHandler.onBodySent(bodyChunk);
  }
}

module.exports = handleStreamBodyPipeline;
