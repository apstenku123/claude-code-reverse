/**
 * Formats the provided content and usage into a standardized object structure.
 * If the content is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in an array with a text object; otherwise, uses the content as-is.
 * Delegates further processing to the createAssistantMessage function.
 *
 * @param {Object} params - The parameters object.
 * @param {string|Array} params.content - The content to be formatted. Can be a string or an array of content objects.
 * @param {*} params.usage - Usage information to be passed along.
 * @returns {*} The result of the createAssistantMessage function with the formatted content and usage.
 */
function formatContentWithUsage({ content, usage }) {
  // If content is a string, wrap isBlobOrFileLikeObject in an array with a text object
  // If the string is empty, use the fallback value 'eY'
  const formattedContent = typeof content === "string"
    ? [{
        type: "text",
        text: content === "" ? eY : content
      }]
    : content;

  // Pass the formatted content and usage to createAssistantMessage for further processing
  return createAssistantMessage({
    content: formattedContent,
    usage: usage
  });
}

module.exports = formatContentWithUsage;