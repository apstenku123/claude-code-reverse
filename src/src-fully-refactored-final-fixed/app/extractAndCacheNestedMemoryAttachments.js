/**
 * Extracts nested memory attachment triggers from the provided object, processes them,
 * and caches their content if not already present in the readFileState. After processing,
 * clears the triggers to avoid duplicate processing.
 *
 * @async
 * @param {Object} contextObj - The object containing nestedMemoryAttachmentTriggers, readFileState, and permission context methods.
 * @returns {Promise<Array<Object>>} An array of newly processed nested memory attachment objects.
 */
async function extractAndCacheNestedMemoryAttachments(contextObj) {
  const newNestedMemoryAttachments = [];

  // Check if there are any nested memory attachment triggers to process
  if (
    contextObj.nestedMemoryAttachmentTriggers &&
    contextObj.nestedMemoryAttachmentTriggers.size > 0
  ) {
    // Iterate over each trigger
    for (const trigger of contextObj.nestedMemoryAttachmentTriggers) {
      try {
        // Get the permission context for the current trigger
        const permissionContext = contextObj.getToolPermissionContext();
        // collectProjectMentionsFromAncestry presumably returns an array of attachment objects for this trigger
        const attachments = collectProjectMentionsFromAncestry(trigger, permissionContext);

        // For each attachment, cache isBlobOrFileLikeObject if not already present
        for (const attachment of attachments) {
          if (!contextObj.readFileState[attachment.path]) {
            // Add to the result array
            newNestedMemoryAttachments.push({
              type: "nested_memory",
              path: attachment.path,
              content: attachment
            });
            // Cache the content and timestamp
            contextObj.readFileState[attachment.path] = {
              content: attachment.content,
              timestamp: Date.now()
            };
          }
        }
      } catch (error) {
        // Handle errors during processing of a trigger
        reportErrorIfAllowed(error);
      }
    }
    // Clear triggers after processing to prevent re-processing
    contextObj.nestedMemoryAttachmentTriggers.clear();
  }

  return newNestedMemoryAttachments;
}

module.exports = extractAndCacheNestedMemoryAttachments;