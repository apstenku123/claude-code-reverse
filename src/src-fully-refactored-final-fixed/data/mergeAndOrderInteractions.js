/**
 * Merges two arrays of interaction entries, ordering tool result messages immediately after their corresponding tool use messages.
 *
 * @param {Array<Object>} interactionEntries - The primary array of interaction entries to process.
 * @param {Array<Object>} additionalEntries - Additional entries to append to the result.
 * @returns {Array<Object>} The merged and ordered array of interaction entries.
 */
function mergeAndOrderInteractions(interactionEntries, additionalEntries) {
  const orderedEntries = [];
  const toolUseEntries = [];

  for (const entry of interactionEntries) {
    // Collect all tool use entries for later reference
    if (hasAssistantToolUseMessage(entry)) {
      toolUseEntries.push(entry);
    }

    // If entry is a user message with a tool_result as its first content item
    if (
      entry.type === "user" &&
      Array.isArray(entry.message.content) &&
      entry.message.content[0]?.type === "tool_result"
    ) {
      const toolUseId = entry.message.content[0]?.tool_use_id;
      // Find the corresponding tool use entry by id
      const matchingToolUseEntry = toolUseEntries.find(
        toolUseEntry => toolUseEntry.message.content[0]?.id === toolUseId
      );
      if (matchingToolUseEntry) {
        // Insert the tool result entry immediately after its tool use entry
        const insertIndex = orderedEntries.indexOf(matchingToolUseEntry) + 1;
        orderedEntries.splice(insertIndex, 0, entry);
        continue;
      }
    }
    // For all other cases, just append the entry
    orderedEntries.push(entry);
  }

  // Append any additional entries
  for (const entry of additionalEntries) {
    orderedEntries.push(entry);
  }

  return orderedEntries;
}

module.exports = mergeAndOrderInteractions;