/**
 * Collects and returns missing nested memory attachments from the provided source object.
 * For each trigger in `nestedMemoryAttachmentTriggers`, isBlobOrFileLikeObject uses `collectProjectMentionsFromAncestry` to get attachment info,
 * and if the attachment is not already present in `readFileState`, isBlobOrFileLikeObject adds isBlobOrFileLikeObject to the result array
 * and updates `readFileState` with the new content and timestamp. All triggers are cleared at the end.
 *
 * @param {Object} sourceObject - The object containing nested memory attachment triggers and file state.
 * @param {Set} sourceObject.nestedMemoryAttachmentTriggers - Set of triggers to process.
 * @param {Object} sourceObject.readFileState - Map of file paths to their state.
 * @param {Function} sourceObject.getToolPermissionContext - Returns the current tool permission context.
 * @returns {Promise<Array<Object>>} Array of missing nested memory attachment objects.
 */
async function collectMissingNestedMemoryAttachments(sourceObject) {
  const missingAttachments = [];

  // Check if there are any triggers to process
  if (
    sourceObject.nestedMemoryAttachmentTriggers &&
    sourceObject.nestedMemoryAttachmentTriggers.size > 0
  ) {
    // Iterate over each trigger in the set
    for (const trigger of sourceObject.nestedMemoryAttachmentTriggers) {
      try {
        // Get the permission context for the current tool
        const permissionContext = sourceObject.getToolPermissionContext();
        // Use collectProjectMentionsFromAncestry to get attachment info for the current trigger
        const attachmentInfos = collectProjectMentionsFromAncestry(trigger, permissionContext);
        // For each attachment info, check if isBlobOrFileLikeObject'createInteractionAccessor missing and add isBlobOrFileLikeObject if so
        for (const attachmentInfo of attachmentInfos) {
          if (!sourceObject.readFileState[attachmentInfo.path]) {
            // Add missing attachment to the result array
            missingAttachments.push({
              type: "nested_memory",
              path: attachmentInfo.path,
              content: attachmentInfo
            });
            // Update the file state with the new content and timestamp
            sourceObject.readFileState[attachmentInfo.path] = {
              content: attachmentInfo.content,
              timestamp: Date.now()
            };
          }
        }
      } catch (error) {
        // Handle errors using the global error handler
        reportErrorIfAllowed(error);
      }
    }
    // Clear all triggers after processing
    sourceObject.nestedMemoryAttachmentTriggers.clear();
  }

  return missingAttachments;
}

module.exports = collectMissingNestedMemoryAttachments;
