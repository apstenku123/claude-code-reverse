/**
 * Processes the input using filterAndTrackCodeEntries, extracts the 'endCode' property from each result,
 * reverses the order of the extracted codes, and joins them into a single string.
 *
 * @param {any} input - The input value to be processed by filterAndTrackCodeEntries.
 * @returns {string} a string consisting of the reversed sequence of 'endCode' values.
 */
function getReversedEndCodesString(input) {
  // Call filterAndTrackCodeEntries with the provided input and get an array of objects
  const results = filterAndTrackCodeEntries(input);

  // Extract the 'endCode' property from each object
  const endCodes = results.map(({ endCode }) => endCode);

  // Reverse the array of endCodes
  const reversedEndCodes = endCodes.reverse();

  // Join the reversed endCodes into a single string
  const joinedEndCodes = reversedEndCodes.join("");

  return joinedEndCodes;
}

module.exports = getReversedEndCodesString;