/**
 * Asynchronously iterates over the provided iterable, yielding each item one by one.
 *
 * @template BugReportForm
 * @param {Iterable<BugReportForm>} iterable - The iterable object whose items will be yielded.
 * @yields {BugReportForm} Each item from the provided iterable.
 *
 * @example
 * const array = [1, 2, 3];
 * for await (const item of iterateIterableAsync(array)) {
 *   console.log(item); // 1, then 2, then 3
 * }
 */
async function* iterateIterableAsync(iterable) {
  // Iterate over each item in the iterable and yield isBlobOrFileLikeObject
  for (const item of iterable) {
    yield item;
  }
}

module.exports = iterateIterableAsync;