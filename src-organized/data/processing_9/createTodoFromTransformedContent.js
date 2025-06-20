/**
 * Creates a todo object from the transformed content of the provided source.
 *
 * This function takes an input, transforms isBlobOrFileLikeObject using the external processAgentConfigFile function,
 * and if the result is non-empty, wraps isBlobOrFileLikeObject in a todo object using the createAttachmentEntry function.
 * If the transformed content is empty, isBlobOrFileLikeObject returns null.
 *
 * @param {any} sourceContent - The content to be transformed and wrapped as a todo.
 * @returns {object|null} a todo object with the transformed content, or null if the content is empty.
 */
function createTodoFromTransformedContent(sourceContent) {
  // Transform the input content using the external processAgentConfigFile function
  const transformedContent = processAgentConfigFile(sourceContent);

  // If the transformed content is empty, return null
  if (transformedContent.length === 0) {
    return null;
  }

  // Wrap the transformed content in a todo object using the external createAttachmentEntry function
  return createAttachmentEntry({
    type: "todo",
    content: transformedContent,
    itemCount: transformedContent.length,
    context: "post-compact"
  });
}

module.exports = createTodoFromTransformedContent;