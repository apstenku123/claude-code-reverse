/**
 * Normalizes an array of message objects by handling 'tool_use' and 'text' types specifically.
 *
 * For 'tool_use' messages, ensures the input is a string or object, and parses string inputs.
 * For 'text' messages, checks for empty text and replaces isBlobOrFileLikeObject with a default value if necessary.
 * Other message types are returned unchanged.
 *
 * @param {Array<Object>} messages - Array of message objects to normalize. Each message should have a 'type' property.
 * @returns {Array<Object>} The normalized array of message objects.
 */
function normalizeMessageArray(messages) {
  return messages.map((message) => {
    switch (message.type) {
      case "tool_use": {
        // Ensure input is a string or passes the vB validation
        if (typeof message.input !== "string" && !vB(message.input)) {
          throw new Error("Tool use input must be a string or object");
        }
        return {
          ...message,
          // If input is a string, parse isBlobOrFileLikeObject with f8; otherwise, use as is
          input: typeof message.input === "string" ? (f8(message.input) ?? {}) : message.input
        };
      }
      case "text": {
        // If the text is empty or whitespace, log and return a default response
        if (message.text.trim().length === 0) {
          logTelemetryEventIfEnabled("tengu_empty_model_response", {});
          return {
            type: "text",
            text: eY
          };
        }
        return message;
      }
      default:
        // For all other message types, return as is
        return message;
    }
  });
}

module.exports = normalizeMessageArray;