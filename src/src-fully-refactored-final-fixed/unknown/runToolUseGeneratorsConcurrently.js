/**
 * Runs multiple tool use async generators concurrently, yielding their results as they become available.
 *
 * For each tool use request in `toolUseRequests`, finds the corresponding tool configuration in `toolConfigs`,
 * then invokes the async generator handler for that tool use. All generators are run concurrently with the provided
 * concurrency limit and subscription context.
 *
 * @param {Array<Object>} toolUseRequests - Array of tool use request objects, each with an `id` property.
 * @param {Array<Object>} toolConfigs - Array of tool configuration objects, each with a `message.content` array containing tool use info.
 * @param {Object} subscriptionContext - Context object passed to each tool use generator (e.g., for cancellation or progress tracking).
 * @param {number} concurrencyLimit - Maximum number of concurrent generators to run.
 * @yields {any} Yields results or errors from each tool use async generator as they become available.
 */
async function* runToolUseGeneratorsConcurrently(toolUseRequests, toolConfigs, subscriptionContext, concurrencyLimit) {
  // Map each tool use request to its corresponding async generator
  const toolUseGenerators = toolUseRequests.map(toolRequest => {
    // Find the matching tool configuration for this request
    const matchingConfig = toolConfigs.find(config =>
      config.message.content.some(contentItem =>
        contentItem.type === "tool_use" && contentItem.id === toolRequest.id
      )
    );
    // Create the async generator for this tool use request
    return handleToolUseAsyncGenerator(toolRequest, matchingConfig, subscriptionContext, concurrencyLimit);
  });

  // Run all tool use generators concurrently, yielding their results as they become available
  yield* concurrentAsyncGeneratorRunner(toolUseGenerators, concurrencyLimit);
}

module.exports = runToolUseGeneratorsConcurrently;