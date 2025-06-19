/**
 * Generates and yields observables for each source item that matches a tool_use message in the config.
 *
 * For each item in sourceObservables, finds a corresponding config item whose message content includes a 'tool_use' type with a matching id.
 * Then, creates an observable using handleToolUseAsyncGenerator and yields the results using concurrentAsyncGenerator.
 *
 * @async
 * @generator
 * @param {Array<Object>} sourceObservables - Array of source items to process.
 * @param {Array<Object>} configList - Array of config objects, each with a message.content array.
 * @param {any} subscriptionConfig - Subscription or context object passed to handleToolUseAsyncGenerator.
 * @param {any} iteratorContext - Additional context or iterator passed to handleToolUseAsyncGenerator.
 * @yields {any} - Yields the results from concurrentAsyncGenerator.
 */
async function* generateToolUseObservables(sourceObservables, configList, subscriptionConfig, iteratorContext) {
  // Map each source item to an observable, finding the matching config item by id and tool_use type
  const observables = sourceObservables.map(sourceItem => {
    // Find the config item whose message.content contains a 'tool_use' type with matching id
    const matchingConfig = configList.find(configItem =>
      configItem.message.content.some(
        contentItem => contentItem.type === "tool_use" && contentItem.id === sourceItem.id
      )
    );
    // Create an observable for this source item and its matching config
    return handleToolUseAsyncGenerator(sourceItem, matchingConfig, subscriptionConfig, iteratorContext);
  });

  // Yield all observables using concurrentAsyncGenerator
  yield* concurrentAsyncGenerator(observables, kD5);
}

module.exports = generateToolUseObservables;