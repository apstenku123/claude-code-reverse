/**
 * Returns a randomly shuffled subset of elements from the provided source, up to the specified count.
 *
 * @param {any} source - The source data to extract elements from. Processed by Kq to obtain an array.
 * @param {number} count - The number of elements to include in the random subset.
 * @returns {any[]} a randomly shuffled array containing up to 'count' elements from the source.
 */
function getRandomSubsetFromSource(source, count) {
  // Convert the source into an array using Kq
  const sourceArray = Kq(source);

  // Ensure the count does not exceed the array length and get the valid count
  const validCount = invokeEffectDestroysByTag(count, 0, sourceArray.length);

  // Shuffle the array in place and truncate to the valid count
  return shuffleArrayInPlace(sourceArray, validCount);
}

module.exports = getRandomSubsetFromSource;