/**
 * Processes a list of interaction entries, yielding results from tool use handlers for each entry.
 *
 * For each interaction entry, finds the corresponding message in the provided messages array
 * that contains a tool use event with a matching updateSnapshotAndNotify, then delegates handling to the tool use
 * async generator, yielding all results.
 *
 * @async
 * @generator
 * @param {Array<Object>} interactionEntries - Array of interaction entries to process.
 * @param {Array<Object>} messages - Array of message objects, each containing a 'content' array.
 * @param {Object} toolUseContext - Context object passed to the tool use handler.
 * @param {Object} toolUseOptions - Additional options for the tool use handler.
 * @yields {any} Results yielded by the tool use async generator for each interaction entry.
 */
async function* processToolUseInteractions(
  interactionEntries,
  messages,
  toolUseContext,
  toolUseOptions
) {
  for (const interactionEntry of interactionEntries) {
    // Find the message that contains a 'tool_use' event matching the interaction entry'createInteractionAccessor updateSnapshotAndNotify
    const matchingMessage = messages.find(message =>
      message.content.some(
        contentItem =>
          contentItem.type === "tool_use" && contentItem.id === interactionEntry.id
      )
    );
    // Delegate to the tool use async generator, yielding all results
    yield* handleToolUseAsyncGenerator(
      interactionEntry,
      matchingMessage,
      toolUseContext,
      toolUseOptions
    );
  }
}

module.exports = processToolUseInteractions;