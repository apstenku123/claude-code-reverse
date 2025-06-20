/**
 * Parses a colon-separated string, applies the jB6 transformation to each segment,
 * and returns a single flattened array of the results.
 *
 * @param {string} colonSeparatedString - a string containing segments separated by colons (":").
 * @returns {any[]} An array containing the flattened results of applying jB6 to each segment.
 */
function parseColonSeparatedAndFlatten(colonSeparatedString) {
  // Return an empty array if the input string is empty
  if (colonSeparatedString === "") return [];

  // Split the string by colon, apply jB6 to each segment, and flatten the result
  const transformedSegments = colonSeparatedString
    .split(":")
    .map(segment => jB6(segment));

  // Flatten the array of arrays into a single array
  return [].concat(...transformedSegments);
}

module.exports = parseColonSeparatedAndFlatten;