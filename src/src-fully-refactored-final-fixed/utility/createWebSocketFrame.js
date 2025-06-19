/**
 * Creates a WebSocket frame from a given source and configuration.
 *
 * @param {any} sourceData - The data to be framed (payload for the WebSocket frame).
 * @param {string} dataType - The type of the data; should be compared against nh.string to determine frame type.
 * @returns {any} The created WebSocket frame, either as TEXT or BINARY depending on dataType.
 */
function createWebSocketFrame(sourceData, dataType) {
  // Transform the source data using the convertInputToBufferLike utility function
  const transformedData = convertInputToBufferLike(sourceData, dataType);
  // Create a new EU6 instance with the transformed data
  const frameBuilder = new EU6(transformedData);
  // Determine the frame type: TEXT if dataType matches nh.string, otherwise BINARY
  const frameType = dataType === nh.string ? Ml0.TEXT : Ml0.BINARY;
  // Create and return the WebSocket frame
  return frameBuilder.createFrame(frameType);
}

module.exports = createWebSocketFrame;