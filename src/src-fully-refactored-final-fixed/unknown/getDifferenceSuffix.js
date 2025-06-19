/**
 * Compares two arrays and returns a string representing the number of differing trailing elements in the first array,
 * followed by the differing suffix of the second array, joined by slashes.
 *
 * For example, given ["a", "b", "c"] and ["a", "b", "d", "e"],
 * the function returns "1/d/e" because the arrays differ at index 2, and the suffix of the second array is ["d", "e"].
 *
 * @param {Array} firstArray - The first array to compare.
 * @param {Array} secondArray - The second array to compare.
 * @returns {string} a string in the format: "<number of differing elements in first array>/<suffix of second array>"
 */
function getDifferenceSuffix(firstArray, secondArray) {
  let commonPrefixLength = 0;
  // Find the length of the common prefix
  while (
    commonPrefixLength < firstArray.length &&
    commonPrefixLength < secondArray.length &&
    firstArray[commonPrefixLength] === secondArray[commonPrefixLength]
  ) {
    commonPrefixLength++;
  }

  // Calculate the number of differing elements in the first array
  const differingCount = firstArray.length - commonPrefixLength;
  // Get the differing suffix from the second array
  const differingSuffix = secondArray.slice(commonPrefixLength);

  // Combine the count and the suffix into a single string
  return [differingCount.toString(), ...differingSuffix].join("/");
}

module.exports = getDifferenceSuffix;
