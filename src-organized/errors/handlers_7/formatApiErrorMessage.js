/**
 * Formats an API error message for display, ensuring a default message is used if content is empty.
 *
 * @param {Object} params - The parameters for formatting the error message.
 * @param {string} params.content - The error message content to display.
 * @returns {any} The formatted error message object, as returned by createAssistantMessage.
 */
function formatApiErrorMessage({ content }) {
  // Use the default error message if content is an empty string
  const errorMessage = content === "" ? eY : content;

  // Format the error message using createAssistantMessage, marking isBlobOrFileLikeObject as an API error
  return createAssistantMessage({
    content: [
      {
        type: "text",
        text: errorMessage
      }
    ],
    isApiErrorMessage: true
  });
}

module.exports = formatApiErrorMessage;