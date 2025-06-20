/**
 * Creates an array of pairs from the elements of a Set-like object.
 * Each pair contains the element twice: [element, element].
 *
 * @param {Set<any>} inputSet - The Set or Set-like object to process. Must have a .size property and .forEach method.
 * @returns {Array<[any, any]>} An array where each entry is a pair [element, element] from the input set.
 */
function createPairsFromSet(inputSet) {
  // Initialize the result array with the same size as the input set
  const pairsArray = Array(inputSet.size);
  let currentIndex = -1;

  // Iterate over each element in the set and add a pair [element, element] to the array
  inputSet.forEach(function(element) {
    pairsArray[++currentIndex] = [element, element];
  });

  return pairsArray;
}

module.exports = createPairsFromSet;
