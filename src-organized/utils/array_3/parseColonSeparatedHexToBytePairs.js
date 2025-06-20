/**
 * Converts a colon-separated hexadecimal string into a flat array of byte pairs.
 *
 * Each segment (between colons) is interpreted as a hexadecimal value and converted
 * into an array containing its high and low byte values using the hexToBytePair function.
 * The resulting arrays are flattened into a single array.
 *
 * @param {string} colonSeparatedHexString - a string containing hexadecimal values separated by colons (e.g., "1A:2B:3C").
 * @returns {number[]} An array of byte values, flattened from the byte pairs of each segment.
 */
function parseColonSeparatedHexToBytePairs(colonSeparatedHexString) {
  // Return an empty array if the input string is empty
  if (colonSeparatedHexString === "") return [];

  // Split the string by colons and convert each segment to a byte pair array
  const bytePairsArray = colonSeparatedHexString
    .split(":")
    .map(hexSegment => hexToBytePair(hexSegment));

  // Flatten the array of arrays into a single array of bytes
  return [].concat(...bytePairsArray);
}

module.exports = parseColonSeparatedHexToBytePairs;