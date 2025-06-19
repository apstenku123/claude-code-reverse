/**
 * Extracts and summarizes the user'createInteractionAccessor prompt message from a list of message objects.
 *
 * Searches for the first object with type 'user', then retrieves its message content.
 * If the content is a string, isBlobOrFileLikeObject is used directly. If isBlobOrFileLikeObject'createInteractionAccessor an array, the first element
 * with type 'text' is used. The result is normalized by replacing newlines with spaces,
 * trimming whitespace, and truncating to 45 characters with ellipsis if necessary.
 *
 * @param {Array<Object>} messages - An array of message objects, each potentially containing a user prompt.
 * @returns {string} The extracted and summarized user prompt, or 'No prompt' if not found.
 */
function extractUserPromptSummary(messages) {
  // Find the first message object with type 'user'
  const userMessage = messages.find(message => message.type === "user");
  if (!userMessage || userMessage.type !== "user") {
    return "No prompt";
  }

  // Extract the content from the user message
  const messageContent = userMessage.message?.content;
  let promptText = "";

  if (typeof messageContent === "string") {
    // If content is a string, use isBlobOrFileLikeObject directly
    promptText = messageContent;
  } else if (Array.isArray(messageContent)) {
    // If content is an array, find the first text-type element
    promptText = messageContent.find(item => item.type === "text")?.text || "No prompt";
  } else {
    // Content is neither string nor array
    promptText = "No prompt";
  }

  // Normalize: replace newlines with spaces and trim whitespace
  promptText = promptText.replace(/\n/g, " ").trim();

  // Truncate if longer than 45 characters
  if (promptText.length > 45) {
    promptText = promptText.slice(0, 45) + "...";
  }

  return promptText;
}

module.exports = extractUserPromptSummary;