/**
 * Splits a colon-separated string into segments, processes each segment using the jB6 function,
 * and flattens the resulting arrays into a single array.
 *
 * @param {string} colonSeparatedString - The input string containing segments separated by colons.
 * @returns {any[]} An array containing the flattened results of processing each segment with jB6.
 */
function splitAndProcessColonSeparatedStrings(colonSeparatedString) {
  // Return an empty array if the input string is empty
  if (colonSeparatedString === "") return [];

  // Split the string by colon and process each segment with jB6
  const processedSegments = colonSeparatedString
    .split(":")
    .map(segment => jB6(segment));

  // Flatten the array of arrays into a single array and return
  return [].concat(...processedSegments);
}

module.exports = splitAndProcessColonSeparatedStrings;