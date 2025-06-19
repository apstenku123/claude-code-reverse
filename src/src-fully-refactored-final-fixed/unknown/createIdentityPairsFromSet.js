/**
 * Creates an array of pairs, where each pair contains the same element from the input Set.
 *
 * @param {Set<any>} inputSet - The Set whose elements will be paired with themselves.
 * @returns {Array<[any, any]>} An array of [element, element] pairs for each element in the Set.
 */
function createIdentityPairsFromSet(inputSet) {
  // Initialize an array with the same size as the input Set
  const identityPairs = Array(inputSet.size);
  let currentIndex = -1;

  // For each element in the Set, add a pair [element, element] to the array
  inputSet.forEach(function(element) {
    identityPairs[++currentIndex] = [element, element];
  });

  return identityPairs;
}

module.exports = createIdentityPairsFromSet;