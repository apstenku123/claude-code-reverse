/**
 * Retrieves the last item emitted by an async iterable (such as an async generator).
 * Throws an error if the iterable yields no items.
 *
 * @async
 * @param {AsyncIterable<any>} asyncIterable - The async iterable to consume.
 * @returns {Promise<any>} The last item emitted by the async iterable.
 * @throws {Error} If the iterable yields no items.
 */
async function getLastItemFromAsyncIterable(asyncIterable) {
  // uw2 is assumed to be a unique sentinel value indicating 'no value seen yet'
  let lastItem = uw2;
  // Iterate through all items in the async iterable, updating lastItem each time
  for await (const item of asyncIterable) {
    lastItem = item;
  }
  // If no items were yielded, throw an error
  if (lastItem === uw2) {
    throw new Error("No items in generator");
  }
  // Return the last item seen
  return lastItem;
}

module.exports = getLastItemFromAsyncIterable;