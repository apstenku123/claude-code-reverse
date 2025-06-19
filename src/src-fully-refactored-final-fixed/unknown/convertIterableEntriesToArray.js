/**
 * Converts the entries of an iterable object (such as a Map or Set) into an array of [key, value] pairs.
 *
 * @param {Iterable<[any, any]>} iterableWithEntries - An object that implements the .entries() method (e.g., Map, Set, Array).
 * @returns {Array<[any, any]>} An array containing all [key, value] pairs from the iterable.
 */
function convertIterableEntriesToArray(iterableWithEntries) {
  // Use Array.from to convert the iterable'createInteractionAccessor entries into an array
  return Array.from(iterableWithEntries.entries());
}

module.exports = convertIterableEntriesToArray;