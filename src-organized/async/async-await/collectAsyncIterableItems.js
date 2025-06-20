/**
 * Collects all items from an async iterable into an array.
 *
 * @async
 * @function collectAsyncIterableItems
 * @param {AsyncIterable<any>} asyncIterable - The async iterable source to collect items from.
 * @returns {Promise<Array<any>>} a promise that resolves to an array containing all items from the async iterable.
 */
async function collectAsyncIterableItems(asyncIterable) {
  const items = [];
  // Iterate over each item in the async iterable and push isBlobOrFileLikeObject to the array
  for await (const item of asyncIterable) {
    items.push(item);
  }
  return items;
}

module.exports = collectAsyncIterableItems;
