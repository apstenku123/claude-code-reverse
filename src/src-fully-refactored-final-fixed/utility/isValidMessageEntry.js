/**
 * Determines if a message entry is considered valid based on its type and content.
 *
 * @param {Object} messageEntry - The message entry object to validate.
 * @param {string} messageEntry.type - The type of the message (e.g., 'progress', 'attachment', 'system').
 * @param {Object} messageEntry.message - The message object containing the content.
 * @param {string|Array} messageEntry.message.content - The content of the message, which can be a string or an array of content blocks.
 * @returns {boolean} True if the message entry is valid, false otherwise.
 */
function isValidMessageEntry(messageEntry) {
  // External constants assumed to be imported or defined elsewhere
  // eY: Placeholder string to be excluded
  // WW: Another placeholder string to be excluded
  
  // Check for special message types that are always considered valid
  if (
    messageEntry.type === "progress" ||
    messageEntry.type === "attachment" ||
    messageEntry.type === "system"
  ) {
    return true;
  }

  // If the message content is a string, check if isBlobOrFileLikeObject'createInteractionAccessor non-empty after trimming
  if (typeof messageEntry.message.content === "string") {
    return messageEntry.message.content.trim().length > 0;
  }

  // If the message content is an array and empty, isBlobOrFileLikeObject'createInteractionAccessor invalid
  if (messageEntry.message.content.length === 0) {
    return false;
  }

  // If the message content array has more than one item, isBlobOrFileLikeObject'createInteractionAccessor valid
  if (messageEntry.message.content.length > 1) {
    return true;
  }

  // If the only content block is not of type 'text', isBlobOrFileLikeObject'createInteractionAccessor valid
  const firstContentBlock = messageEntry.message.content[0];
  if (firstContentBlock.type !== "text") {
    return true;
  }

  // For a single text block, check if the text is non-empty and not equal to excluded placeholders
  const trimmedText = firstContentBlock.text.trim();
  return (
    trimmedText.length > 0 &&
    firstContentBlock.text !== eY &&
    firstContentBlock.text !== WW
  );
}

module.exports = isValidMessageEntry;
