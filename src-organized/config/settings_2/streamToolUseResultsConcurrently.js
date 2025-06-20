/**
 * Streams the results of handling tool use events concurrently for a set of observables.
 *
 * For each observable in the sourceObservables array, finds the corresponding tool use configuration
 * from toolUseConfigs, and invokes handleToolUseAsyncGenerator with the observable, its config, the
 * subscription, and the context. All resulting async generators are then processed concurrently
 * (with a concurrency limit) using concurrentAsyncGenerator.
 *
 * @param {Array<Object>} sourceObservables - Array of observable objects to process.
 * @param {Array<Object>} toolUseConfigs - Array of tool use configuration objects, each with a message containing content.
 * @param {Object} subscription - Subscription object to be passed to the tool use handler.
 * @param {Object} context - Additional context or options for tool use handling.
 * @returns {AsyncGenerator<any>} An async generator yielding results from all tool use handlers as they become available.
 */
async function* streamToolUseResultsConcurrently(sourceObservables, toolUseConfigs, subscription, context) {
  // Map each observable to its corresponding async generator for tool use handling
  const toolUseGenerators = sourceObservables.map(observable => {
    // Find the matching tool use config for this observable based on tool_use type and matching id
    const matchingConfig = toolUseConfigs.find(config =>
      config.message.content.some(
        contentItem => contentItem.type === "tool_use" && contentItem.id === observable.id
      )
    );
    // Create an async generator for this observable and its config
    return handleToolUseAsyncGenerator(observable, matchingConfig, subscription, context);
  });

  // Yield results from all tool use generators concurrently, respecting concurrency limit
  yield* concurrentAsyncGenerator(toolUseGenerators, concurrencyLimit);
}

// Export the function for use in other modules
module.exports = streamToolUseResultsConcurrently;