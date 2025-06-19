/**
 * Creates a new 'todo' activity object from the provided content source.
 * If the extracted content is empty, returns null.
 *
 * @param {any} contentSource - The source from which to extract todo content.
 * @returns {object|null} Returns a todo activity object if content exists, otherwise null.
 */
function createTodoActivityFromContent(contentSource) {
  // Extract content using the processAgentConfigFile utility function
  const extractedContent = processAgentConfigFile(contentSource);

  // If no content was extracted, return null
  if (extractedContent.length === 0) {
    return null;
  }

  // Create and return a new todo activity object using createAttachmentEntry
  return createAttachmentEntry({
    type: "todo",
    content: extractedContent,
    itemCount: extractedContent.length,
    context: "post-compact"
  });
}

module.exports = createTodoActivityFromContent;