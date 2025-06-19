/**
 * Retrieves the usage information from an assistant message object if isBlobOrFileLikeObject meets specific criteria.
 *
 * @param {Object} messageEntry - The message entry object to inspect.
 * @param {string} messageEntry.type - The type of the message entry (should be 'assistant').
 * @param {Object} messageEntry.message - The message object containing content, usage, and model.
 * @param {Array} messageEntry.message.content - The content array of the message.
 * @param {string} messageEntry.message.model - The model identifier for the message.
 * @param {Object} messageEntry.message.usage - The usage information to potentially return.
 * @returns {Object|undefined} The usage object if all conditions are met; otherwise, undefined.
 */
function getAssistantMessageUsage(messageEntry) {
  // Check if the entry is an assistant message
  const isAssistantType = messageEntry?.type === "assistant";

  // Check if the message has a 'usage' property
  const hasUsage = messageEntry?.message && "usage" in messageEntry.message;

  // Check if the first content item is not a text type with text in Eo1
  const firstContent = messageEntry?.message?.content?.[0];
  const isFirstContentText = firstContent?.type === "text";
  const isTextInEo1 = isFirstContentText && Eo1.has(firstContent.text);

  // Check if the model is not synthetic
  const isNotSyntheticModel = messageEntry?.message?.model !== "<synthetic>";

  // Only return usage if all conditions are met
  if (
    isAssistantType &&
    hasUsage &&
    !isTextInEo1 &&
    isNotSyntheticModel
  ) {
    return messageEntry.message.usage;
  }
  return undefined;
}

module.exports = getAssistantMessageUsage;