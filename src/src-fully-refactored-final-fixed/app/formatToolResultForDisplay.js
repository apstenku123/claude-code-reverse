/**
 * Formats the result of a tool invocation for display purposes.
 *
 * This function takes a tool handler object and a result parameter, processes the result,
 * and returns a formatted block suitable for display. If the result contains images,
 * isBlobOrFileLikeObject returns the content directly. Otherwise, isBlobOrFileLikeObject returns a stringified version of the result.
 * If an error occurs during processing, isBlobOrFileLikeObject returns an error message.
 *
 * @param {Object} toolHandler - The tool handler object, expected to have a 'name' property and a 'mapToolResultToToolResultBlockParam' method.
 * @param {any} toolResultParam - The result parameter to be mapped and formatted.
 * @returns {Object} - a formatted block object for display, with 'content' and 'isMeta' properties.
 */
function formatToolResultForDisplay(toolHandler, toolResultParam) {
  try {
    // Map the raw tool result to a standardized block parameter object
    const toolResultBlock = toolHandler.mapToolResultToToolResultBlockParam(toolResultParam, "1");

    // If the content is an array and contains any image type, return the content directly
    if (Array.isArray(toolResultBlock.content) && toolResultBlock.content.some(item => item.type === "image")) {
      return createUserMessageObject({
        content: toolResultBlock.content,
        isMeta: true
      });
    }

    // Otherwise, return a stringified version of the content
    return createUserMessageObject({
      content: `Result of calling the ${toolHandler.name} tool: ${JSON.stringify(toolResultBlock.content)}`,
      isMeta: true
    });
  } catch {
    // In case of any error, return a generic error message
    return createUserMessageObject({
      content: `Result of calling the ${toolHandler.name} tool: Error`,
      isMeta: true
    });
  }
}

module.exports = formatToolResultForDisplay;