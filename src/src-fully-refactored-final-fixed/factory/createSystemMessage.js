/**
 * Factory function to create a standardized system message object.
 *
 * @param {string} messageContent - The content of the system message.
 * @returns {Object} a system message object containing type, content, metadata flag, timestamp, and a unique identifier.
 */
function createSystemMessage(messageContent) {
  return {
    type: "system", // Indicates this is a system message
    content: messageContent, // The actual message content
    isMeta: false, // Flag indicating this is not a meta message
    timestamp: new Date().toISOString(), // ISO timestamp of message creation
    uuid: NO() // Unique identifier for the message
  };
}

module.exports = createSystemMessage;