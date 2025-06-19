/**
 * Shuffles a transformed subset of an array in place and returns the shuffled subset.
 *
 * This function first transforms the input array using the `transformArray` function (M7),
 * then extracts a subset of the transformed array using the `getArraySubset` function (invokeEffectDestroysByTag),
 * and finally shuffles the subset in place using the `shuffleArrayInPlace` function (shuffleArrayInPlace).
 *
 * @param {Array} inputArray - The array to be transformed and shuffled.
 * @param {number} subsetLength - The number of elements to include in the subset and shuffle.
 * @returns {Array} The shuffled subset of the transformed array.
 */
function shuffleTransformedArraySubset(inputArray, subsetLength) {
  // Transform the input array (e.g., mapping, filtering, etc.)
  const transformedArray = M7(inputArray);

  // Extract a subset of the transformed array from index 0 to subsetLength
  const arraySubset = invokeEffectDestroysByTag(subsetLength, 0, inputArray.length);

  // Shuffle the subset in place and truncate to the specified count
  return shuffleArrayInPlace(transformedArray, arraySubset);
}

module.exports = shuffleTransformedArraySubset;