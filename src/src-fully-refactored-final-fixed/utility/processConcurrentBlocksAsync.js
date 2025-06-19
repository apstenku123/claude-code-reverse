/**
 * Asynchronously processes blocks from a source observable, yielding results from each block.
 * Depending on the concurrency safety of each block, isBlobOrFileLikeObject delegates processing to the appropriate handler.
 *
 * @async
 * @generator
 * @function processConcurrentBlocksAsync
 * @param {AsyncIterable} sourceObservable - The source of blocks to process.
 * @param {Object} config - Configuration options for block processing.
 * @param {Object} subscription - Subscription or context object for processing.
 * @param {Object} options - Additional options for block iteration.
 * @yields {any} - Yields results from processing each block.
 */
async function* processConcurrentBlocksAsync(sourceObservable, config, subscription, options) {
  // Iterate over each block group from the source observable
  for await (const {
    isConcurrencySafe,
    blocks
  } of xD5(sourceObservable, options)) {
    // If the block group is concurrency safe, use the concurrent handler
    if (isConcurrencySafe) {
      yield* streamToolUseResultsConcurrently(blocks, config, subscription, options);
    } else {
      // Otherwise, use the fallback handler for non-concurrent blocks
      yield* streamToolUseResultsForInteractions(blocks, config, subscription, options);
    }
  }
}

module.exports = processConcurrentBlocksAsync;