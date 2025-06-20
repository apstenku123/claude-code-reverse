/**
 * Processes blocks from a source observable, yielding results from each block.
 * If a block is concurrency-safe, isBlobOrFileLikeObject is processed with the concurrency-safe handler; otherwise, with the fallback handler.
 *
 * @async
 * @generator
 * @function processBlocksWithConcurrencySafety
 * @param {Observable} sourceObservable - The source observable to process blocks from.
 * @param {Object} config - Configuration object for processing blocks.
 * @param {Object} subscription - Subscription or context for block processing.
 * @param {Object} options - Additional options for block processing.
 * @yields {*} The result of processing each block.
 */
async function* processBlocksWithConcurrencySafety(sourceObservable, config, subscription, options) {
  // Iterate over each block group yielded by xD5 (block iterator)
  for await (const {
    isConcurrencySafe,
    blocks
  } of xD5(sourceObservable, options)) {
    // If the block group is concurrency-safe, use the concurrency-safe processor
    if (isConcurrencySafe) {
      yield* streamToolUseResultsConcurrently(blocks, config, subscription, options);
    } else {
      // Otherwise, use the fallback processor
      yield* streamToolUseResultsForInteractions(blocks, config, subscription, options);
    }
  }
}

module.exports = processBlocksWithConcurrencySafety;