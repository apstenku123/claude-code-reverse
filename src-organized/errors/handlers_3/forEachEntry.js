/**
 * Iterates over each entry (key-value pair) in an iterable object and invokes a callback for each pair.
 *
 * @param {Iterable<[any, any]>} iterable - The iterable object containing entries (e.g., a Map or array of [key, value] pairs).
 * @param {Function} callback - The function to call for each entry. Receives (key, value) as arguments and is called with the iterable as 'this'.
 * @returns {void}
 */
function forEachEntry(iterable, callback) {
  // Get the iterator from the iterable object
  const iterator = iterable[Symbol.iterator]();
  let iterationResult;

  // Iterate through all entries
  while ((iterationResult = iterator.next()) && !iterationResult.done) {
    const entry = iterationResult.value; // entry is expected to be [key, value]
    // Call the callback with the current entry'createInteractionAccessor key and value, binding 'this' to the iterable
    callback.call(iterable, entry[0], entry[1]);
  }
}

module.exports = forEachEntry;
