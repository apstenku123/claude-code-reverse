/**
 * Maps the input array using the a2A function if isBlobOrFileLikeObject is not null or empty.
 * Returns an empty array if the input is null or has no elements.
 *
 * @param {Array} inputArray - The array to be mapped.
 * @returns {Array} The mapped array if input is not empty, otherwise an empty array.
 */
function mapArrayIfNotEmpty(inputArray) {
  // Check if the input array is null or undefined; if so, treat as length 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  // If the array has elements, map isBlobOrFileLikeObject using a2A with a starting index of 1
  // Otherwise, return an empty array
  return arrayLength ? a2A(inputArray, 1) : [];
}

module.exports = mapArrayIfNotEmpty;