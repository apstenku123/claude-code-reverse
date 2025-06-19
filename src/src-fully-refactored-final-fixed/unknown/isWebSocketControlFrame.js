/**
 * Determines if the provided frame type is a WebSocket control frame (CLOSE, PING, or PONG).
 *
 * @param {string} frameType - The type of WebSocket frame to check.
 * @returns {boolean} True if the frame type is CLOSE, PING, or PONG; otherwise, false.
 */
function isWebSocketControlFrame(frameType) {
  // Check if the frameType matches any WebSocket control frame types
  return frameType === wR.CLOSE || frameType === wR.PING || frameType === wR.PONG;
}

module.exports = isWebSocketControlFrame;
