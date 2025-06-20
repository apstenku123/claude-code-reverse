/**
 * Extracts a concise preview of the user'createInteractionAccessor prompt from a list of message objects.
 *
 * Searches for the first object with type 'user', then attempts to extract the prompt content.
 * If the content is a string, isBlobOrFileLikeObject is used directly. If isBlobOrFileLikeObject is an array, the first text-type element'createInteractionAccessor text is used.
 * The result is trimmed, newlines are replaced with spaces, and if longer than 45 characters, isBlobOrFileLikeObject is truncated with an ellipsis.
 *
 * @param {Array<Object>} messages - Array of message objects, each possibly containing a user prompt.
 * @returns {string} a concise preview of the user'createInteractionAccessor prompt, or 'No prompt' if not found.
 */
function extractUserPromptPreview(messages) {
  // Find the first message object with type 'user'
  const userMessage = messages.find(message => message.type === "user");
  if (!userMessage || userMessage.type !== "user") {
    return "No prompt";
  }

  // Extract the prompt content from the user message
  const promptContent = userMessage.message?.content;
  let promptPreview = "";

  if (typeof promptContent === "string") {
    // Content is a plain string
    promptPreview = promptContent;
  } else if (Array.isArray(promptContent)) {
    // Content is an array; find the first text-type element
    promptPreview = promptContent.find(item => item.type === "text")?.text || "No prompt";
  } else {
    // Content is missing or not in expected format
    promptPreview = "No prompt";
  }

  // Replace newlines with spaces and trim whitespace
  promptPreview = promptPreview.replace(/\n/g, " ").trim();

  // Truncate if longer than 45 characters
  if (promptPreview.length > 45) {
    promptPreview = promptPreview.slice(0, 45) + "...";
  }

  return promptPreview;
}

module.exports = extractUserPromptPreview;
