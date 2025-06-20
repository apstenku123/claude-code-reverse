/**
 * Processes the first message in the provided object and, if isBlobOrFileLikeObject contains a sessionId, 
 * invokes the Vq6 function with the sessionId and a generated value from g9.
 *
 * @param {Object} messageContainer - An object containing a 'messages' array.
 * @param {Array} messageContainer.messages - Array of message objects, possibly containing a sessionId.
 * @returns {void}
 */
function processFirstMessageSession(messageContainer) {
  // Ensure there is at least one message in the messages array
  if (messageContainer.messages.length > 0) {
    const firstMessage = messageContainer.messages[0];
    // Check if the first message exists and has a sessionId property
    if (firstMessage && "sessionId" in firstMessage) {
      // Call Vq6 with the sessionId and a generated value from g9
      Vq6(firstMessage.sessionId, g9());
    }
  }
}

module.exports = processFirstMessageSession;