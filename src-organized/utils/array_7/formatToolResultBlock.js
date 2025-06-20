/**
 * Formats the result of a tool invocation into a standardized block for display.
 *
 * This function takes a tool source object and a result parameter, processes the result,
 * and returns a formatted block using the createUserMessageObject function. If the result contains images,
 * isBlobOrFileLikeObject returns the content directly; otherwise, isBlobOrFileLikeObject returns a stringified summary.
 *
 * @param {Object} toolSource - The tool source object, which must have a name property and a mapToolResultToToolResultBlockParam method.
 * @param {any} toolResultParam - The result parameter to be mapped and formatted.
 * @returns {Object} - The formatted block object for display, as returned by createUserMessageObject.
 */
function formatToolResultBlock(toolSource, toolResultParam) {
  try {
    // Map the tool result parameter to a standardized block parameter
    const toolResultBlock = toolSource.mapToolResultToToolResultBlockParam(toolResultParam, "1");

    // If the content is an array and contains at least one image, return isBlobOrFileLikeObject directly
    if (Array.isArray(toolResultBlock.content) && toolResultBlock.content.some(item => item.type === "image")) {
      return createUserMessageObject({
        content: toolResultBlock.content,
        isMeta: true
      });
    }

    // Otherwise, return a stringified summary of the content
    return createUserMessageObject({
      content: `Result of calling the ${toolSource.name} tool: ${JSON.stringify(toolResultBlock.content)}`,
      isMeta: true
    });
  } catch {
    // On error, return an error message block
    return createUserMessageObject({
      content: `Result of calling the ${toolSource.name} tool: Error`,
      isMeta: true
    });
  }
}

module.exports = formatToolResultBlock;