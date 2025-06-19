/**
 * Returns a randomly shuffled subset of a transformed array, up to a specified count.
 *
 * @param {Array} sourceArray - The array to be transformed and sampled from.
 * @param {number} subsetCount - The number of elements to include in the random subset.
 * @returns {Array} a randomly shuffled subset of the transformed array, limited to subsetCount elements.
 */
function getRandomSubsetFromTransformedArray(sourceArray, subsetCount) {
  // Transform the source array using M7 (external transformation function)
  const transformedArray = M7(sourceArray);

  // Determine the subset of indices using invokeEffectDestroysByTag(external slicing/indexing function)
  // invokeEffectDestroysByTag returns an array of indices or elements from 0 to sourceArray.length, limited by subsetCount
  const subsetIndicesOrElements = invokeEffectDestroysByTag(subsetCount, 0, sourceArray.length);

  // Shuffle the transformed array in place and truncate to the desired count
  // shuffleArrayInPlace (shuffleArrayInPlace) expects the transformed array and the subset indices/elements
  const randomSubset = shuffleArrayInPlace(transformedArray, subsetIndicesOrElements);

  return randomSubset;
}

module.exports = getRandomSubsetFromTransformedArray;