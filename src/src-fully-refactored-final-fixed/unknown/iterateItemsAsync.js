/**
 * Asynchronously iterates over each item in the provided iterable or array-like object,
 * yielding each item one by one. This allows for consumption of items using asynchronous iteration.
 *
 * @async
 * @generator
 * @param {Iterable<any>} items - An iterable or array-like object containing items to yield.
 * @yields {any} Each item from the input iterable, in order.
 *
 * @example
 * for await (const item of iterateItemsAsync([1, 2, 3])) {
 *   console.log(item); // 1, then 2, then 3
 * }
 */
async function* iterateItemsAsync(items) {
  // Loop through each item in the provided iterable
  for (const item of items) {
    // Yield the current item to the consumer
    yield item;
  }
}

module.exports = iterateItemsAsync;
