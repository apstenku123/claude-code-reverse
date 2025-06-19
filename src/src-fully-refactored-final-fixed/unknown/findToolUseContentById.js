/**
 * Searches through a list of message entries to find a specific 'tool_use' content object by its updateSnapshotAndNotify.
 *
 * @param {string} toolUseId - The unique identifier of the tool_use content to search for.
 * @param {Array<Object>} messageEntries - An array of message entry objects to search within.
 * @returns {Object|null} The matching 'tool_use' content object if found, otherwise null.
 */
function findToolUseContentById(toolUseId, messageEntries) {
  let foundToolUseContent = null;

  for (const entry of messageEntries) {
    // Only process entries from the assistant that have a content array
    if (entry.type !== "assistant" || !Array.isArray(entry.message.content)) {
      continue;
    }

    for (const contentItem of entry.message.content) {
      // Check if the content item is a 'tool_use' with the matching updateSnapshotAndNotify
      if (contentItem.type === "tool_use" && contentItem.id === toolUseId) {
        foundToolUseContent = contentItem;
      }
    }
  }

  return foundToolUseContent;
}

module.exports = findToolUseContentById;