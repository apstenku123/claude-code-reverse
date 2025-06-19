/**
 * Creates an array of [element, element] pairs from a collection-like object.
 *
 * @param {Object} collection - An object with a 'size' property and a 'forEach' method (e.g., Set, Map, or similar).
 * @returns {Array<Array<any>>} An array where each entry is a two-element array: [element, element].
 */
function createIdentityPairsFromCollection(collection) {
  // Initialize an array to hold the pairs, with the same length as the collection
  const identityPairs = Array(collection.size);
  // Index to track the current position in the array
  let currentIndex = -1;
  // Iterate over each element in the collection
  collection.forEach(function(element) {
    // For each element, add a pair [element, element] to the array
    identityPairs[++currentIndex] = [element, element];
  });
  return identityPairs;
}

module.exports = createIdentityPairsFromCollection;