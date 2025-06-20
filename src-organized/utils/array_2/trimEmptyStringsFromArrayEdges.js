/**
 * Removes leading and trailing empty string elements from an array.
 *
 * @param {Array<string>} array - The array to trim empty strings from the start and end.
 * @returns {Array<string>} a new array with leading and trailing empty strings removed.
 */
function trimEmptyStringsFromArrayEdges(array) {
  // Find the index of the first non-empty string
  let firstNonEmptyIndex = 0;
  while (firstNonEmptyIndex < array.length && array[firstNonEmptyIndex] === "") {
    firstNonEmptyIndex++;
  }

  // Find the index of the last non-empty string
  let lastNonEmptyIndex = array.length - 1;
  while (lastNonEmptyIndex >= 0 && array[lastNonEmptyIndex] === "") {
    lastNonEmptyIndex--;
  }

  // If there are no non-empty strings, return an empty array
  if (firstNonEmptyIndex > lastNonEmptyIndex) {
    return [];
  }

  // Slice the array from the first to the last non-empty string (inclusive)
  return array.slice(firstNonEmptyIndex, lastNonEmptyIndex + 1);
}

module.exports = trimEmptyStringsFromArrayEdges;