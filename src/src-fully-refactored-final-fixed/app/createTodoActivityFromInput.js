/**
 * Creates a todo activity object from the provided input, if the input is not empty.
 *
 * @param {any} inputData - The input data to be transformed into a todo activity.
 * @returns {object|null} Returns a todo activity object if inputData is not empty, otherwise null.
 */
function createTodoActivityFromInput(inputData) {
  // Transform the input data using processAgentConfigFile(external dependency)
  const transformedContent = processAgentConfigFile(inputData);

  // If the transformed content is empty, return null
  if (transformedContent.length === 0) {
    return null;
  }

  // Create and return a todo activity object using createAttachmentEntry(external dependency)
  return createAttachmentEntry({
    type: "todo",
    content: transformedContent,
    itemCount: transformedContent.length,
    context: "post-compact"
  });
}

module.exports = createTodoActivityFromInput;