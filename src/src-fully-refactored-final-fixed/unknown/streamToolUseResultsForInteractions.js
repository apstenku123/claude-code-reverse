/**
 * Asynchronously streams tool use results for each interaction entry.
 * 
 * For each interaction in the provided array, this generator finds the corresponding message in the messages array
 * (where the message contains a tool_use entry matching the interaction'createInteractionAccessor id), then delegates to handleToolUseAsyncGenerator
 * to yield results for that tool use.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entry objects to process.
 * @param {Array<Object>} messages - Array of message objects, each potentially containing tool_use entries.
 * @param {Object} toolUseContext - Context object passed to the tool use handler (e.g., subscription or environment info).
 * @param {Object} toolUseOptions - Additional options for the tool use handler (e.g., cancellation, progress callbacks).
 * @yields {any} Yields results produced by handleToolUseAsyncGenerator for each interaction.
 */
async function* streamToolUseResultsForInteractions(
  interactionEntries,
  messages,
  toolUseContext,
  toolUseOptions
) {
  for (const interactionEntry of interactionEntries) {
    // Find the message that contains a tool_use entry matching the interaction'createInteractionAccessor id
    const matchingMessage = messages.find(message =>
      message.content.some(
        contentItem =>
          contentItem.type === "tool_use" && contentItem.id === interactionEntry.id
      )
    );

    // Delegate to the async generator that handles tool use, yielding all its results
    yield* handleToolUseAsyncGenerator(
      interactionEntry,
      matchingMessage,
      toolUseContext,
      toolUseOptions
    );
  }
}

module.exports = streamToolUseResultsForInteractions;