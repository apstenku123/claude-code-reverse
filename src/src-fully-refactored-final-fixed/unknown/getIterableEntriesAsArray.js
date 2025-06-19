/**
 * Returns an array of [key, value] pairs from an iterable object that implements the entries() method.
 *
 * @param {Iterable<[any, any]>} iterableWithEntries - An object that implements the entries() method (e.g., Map, Array).
 * @returns {Array<[any, any]>} An array containing [key, value] pairs from the iterable.
 */
function getIterableEntriesAsArray(iterableWithEntries) {
  // Use Array.from to convert the iterable of entries into an array
  return Array.from(iterableWithEntries.entries());
}

module.exports = getIterableEntriesAsArray;
