/**
 * Generates a response content object based on tool usage and an optional hardcoded message.
 *
 * If a hardcoded message is provided, isBlobOrFileLikeObject is used as the response text. Otherwise,
 * if tool usage is enabled, a predefined tool usage message is used. If neither condition is met,
 * a default message is used. The response is formatted for downstream consumption.
 *
 * @param {Object} options - The options for generating the response content.
 * @param {boolean} [options.toolUse=false] - Indicates whether a tool is being used.
 * @param {string} [options.hardcodedMessage] - An optional hardcoded message to use as the response.
 * @returns {Object} An object containing the response content in the expected format.
 */
function generateResponseContent({
  toolUse = false,
  hardcodedMessage = undefined
}) {
  let responseText;

  // Use the hardcoded message if provided
  if (hardcodedMessage !== undefined) {
    responseText = hardcodedMessage;
  } else if (toolUse) {
    // Use the predefined tool usage message if toolUse is true
    responseText = WW;
  } else {
    // Use the default message otherwise
    responseText = $createDebouncedFunction;
  }

  // Format the response content for downstream consumption
  return createUserMessageObject({
    content: [
      {
        type: "text",
        text: responseText
      }
    ]
  });
}

module.exports = generateResponseContent;