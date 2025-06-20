/**
 * Extracts nested memory attachment triggers from the provided object, processes them,
 * and attaches their content to the object'createInteractionAccessor readFileState if not already present.
 *
 * @param {Object} contextObject - The object containing nested memory attachment triggers and file state.
 * @param {Set} contextObject.nestedMemoryAttachmentTriggers - Set of triggers to process.
 * @param {Object} contextObject.readFileState - Map of file paths to their content and timestamps.
 * @param {Function} contextObject.getToolPermissionContext - Returns the permission context for tools.
 * @returns {Promise<Array<Object>>} - Array of attached nested memory file descriptors.
 */
async function extractAndAttachNestedMemoryFiles(contextObject) {
  const attachedMemoryFiles = [];

  // Check if there are any nested memory attachment triggers to process
  if (
    contextObject.nestedMemoryAttachmentTriggers &&
    contextObject.nestedMemoryAttachmentTriggers.size > 0
  ) {
    // Iterate over each trigger in the set
    for (const memoryTrigger of contextObject.nestedMemoryAttachmentTriggers) {
      try {
        // collectProjectMentionsFromAncestry returns an array of file descriptors for the trigger and permission context
        const fileDescriptors = collectProjectMentionsFromAncestry(
          memoryTrigger,
          contextObject.getToolPermissionContext()
        );

        // For each file descriptor, attach if not already present in readFileState
        for (const fileDescriptor of fileDescriptors) {
          if (!contextObject.readFileState[fileDescriptor.path]) {
            attachedMemoryFiles.push({
              type: "nested_memory",
              path: fileDescriptor.path,
              content: fileDescriptor
            });
            contextObject.readFileState[fileDescriptor.path] = {
              content: fileDescriptor.content,
              timestamp: Date.now()
            };
          }
        }
      } catch (error) {
        // Handle errors using the global error handler
        reportErrorIfAllowed(error);
      }
    }
    // Clear triggers after processing
    contextObject.nestedMemoryAttachmentTriggers.clear();
  }

  return attachedMemoryFiles;
}

module.exports = extractAndAttachNestedMemoryFiles;