/**
 * Determines if a message object contains valid, non-empty content.
 * Handles different message types and content structures, including system, progress, attachment, and text messages.
 *
 * @param {Object} messageObject - The message object to validate.
 * @param {string} messageObject.type - The type of the message (e.g., 'progress', 'attachment', 'system', etc.).
 * @param {Object} messageObject.message - The message payload.
 * @param {string|Array} messageObject.message.content - The message content, which can be a string or an array of content blocks.
 * @returns {boolean} True if the message contains valid, non-empty content; otherwise, false.
 */
function isValidMessageContent(messageObject) {
  // External constants that represent special text values to exclude
  // These should be defined/imported elsewhere in your codebase
  // For this refactor, handleMissingDoctypeError assume they are available in the scope
  // const eY = ...;
  // const WW = ...;

  // Return true for system, progress, or attachment messages
  if (
    messageObject.type === "progress" ||
    messageObject.type === "attachment" ||
    messageObject.type === "system"
  ) {
    return true;
  }

  // If content is a string, check if isBlobOrFileLikeObject'createInteractionAccessor non-empty after trimming
  if (typeof messageObject.message.content === "string") {
    return messageObject.message.content.trim().length > 0;
  }

  // If content is an array and empty, isBlobOrFileLikeObject'createInteractionAccessor invalid
  if (messageObject.message.content.length === 0) {
    return false;
  }

  // If content is an array with more than one item, consider isBlobOrFileLikeObject valid
  if (messageObject.message.content.length > 1) {
    return true;
  }

  // If the single content block is not of type 'text', consider isBlobOrFileLikeObject valid
  if (messageObject.message.content[0].type !== "text") {
    return true;
  }

  // Check if the single text block is non-empty and not equal to special excluded values
  const textContent = messageObject.message.content[0].text;
  return (
    textContent.trim().length > 0 &&
    textContent !== eY &&
    textContent !== WW
  );
}

module.exports = isValidMessageContent;