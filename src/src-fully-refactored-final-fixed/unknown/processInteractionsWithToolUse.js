/**
 * Processes a list of user interactions, yielding results from tool use executions for each interaction.
 *
 * For each interaction in the provided array, this async generator finds the corresponding message configuration
 * that includes a tool use reference, and delegates the processing to the handleToolUseAsyncGenerator.
 *
 * @param {Array<Object>} interactions - Array of user interaction objects to process.
 * @param {Array<Object>} messageConfigs - Array of message configuration objects, each containing message content.
 * @param {Object} toolUseContext - Context or options to pass to the tool use handler.
 * @param {Object} cancellationToken - Token or object used to manage cancellation of the tool use process.
 * @yields {any} - Yields the results from the tool use handler for each interaction.
 */
async function* processInteractionsWithToolUse(
  interactions,
  messageConfigs,
  toolUseContext,
  cancellationToken
) {
  for (const interaction of interactions) {
    // Find the message config that references a tool use with the same id as the current interaction
    const matchingMessageConfig = messageConfigs.find(config =>
      config.message.content.some(
        contentItem =>
          contentItem.type === "tool_use" && contentItem.id === interaction.id
      )
    );

    // Delegate processing to the async generator for tool use handling
    yield* handleToolUseAsyncGenerator(
      interaction,
      matchingMessageConfig,
      toolUseContext,
      cancellationToken
    );
  }
}

module.exports = processInteractionsWithToolUse;