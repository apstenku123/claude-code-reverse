/**
 * Asynchronously processes blocks from a source observable, yielding results from each block.
 * Depending on the concurrency safety of each block, delegates processing to the appropriate handler.
 *
 * @async
 * @generator
 * @function processBlocksWithConcurrencyHandling
 * @param {AsyncIterable} sourceObservable - The source observable or iterable providing blocks to process.
 * @param {Object} config - Configuration object passed to the block processors.
 * @param {Object} subscription - Subscription or context object passed to the block processors.
 * @param {Object} options - Additional options for block iteration.
 * @yields {*} - Yields results from processing each block.
 */
async function* processBlocksWithConcurrencyHandling(sourceObservable, config, subscription, options) {
  // Iterate over each block descriptor from the source observable
  for await (const { isConcurrencySafe, blocks } of xD5(sourceObservable, options)) {
    // If the block is concurrency safe, use the concurrency-safe processor
    if (isConcurrencySafe) {
      yield* streamToolUseResultsConcurrently(blocks, config, subscription, options);
    } else {
      // Otherwise, use the fallback processor
      yield* streamToolUseResultsForInteractions(blocks, config, subscription, options);
    }
  }
}

module.exports = processBlocksWithConcurrencyHandling;