/**
 * Extracts the usage information from an assistant message object if isBlobOrFileLikeObject meets specific criteria.
 *
 * The function checks if the provided message object:
 *   1. Has a type of 'assistant'.
 *   2. Contains a 'usage' property within its 'message' object.
 *   3. The first element of 'message.content' is not a text type with text present in the Eo1 set.
 *   4. The 'model' property of 'message' is not '<synthetic>'.
 *
 * If all conditions are met, isBlobOrFileLikeObject returns the 'usage' property from the message; otherwise, isBlobOrFileLikeObject returns undefined.
 *
 * @param {Object} messageObject - The message object to extract usage information from.
 * @param {string} messageObject.type - The type of the message (should be 'assistant').
 * @param {Object} messageObject.message - The message details.
 * @param {Array} messageObject.message.content - The content array of the message.
 * @param {string} messageObject.message.model - The model name of the message.
 * @param {Object} messageObject.message.usage - The usage information to extract.
 * @returns {Object|undefined} The usage information if all conditions are met; otherwise, undefined.
 */
function extractAssistantMessageUsage(messageObject) {
  // Ensure the message is from an assistant
  if (messageObject?.type !== "assistant") {
    return;
  }

  // Ensure 'usage' exists in the message
  if (!("usage" in messageObject.message)) {
    return;
  }

  // Check if the first content item is a text type and its text is in the Eo1 set
  const firstContentItem = messageObject.message.content[0];
  const isFirstContentTextType = firstContentItem?.type === "text";
  const isTextInEo1 = isFirstContentTextType && Eo1.has(firstContentItem.text);

  // If the first content is a text type and its text is in Eo1, do not return usage
  if (isTextInEo1) {
    return;
  }

  // Exclude synthetic models
  if (messageObject.message.model === "<synthetic>") {
    return;
  }

  // All conditions met; return usage
  return messageObject.message.usage;
}

module.exports = extractAssistantMessageUsage;
