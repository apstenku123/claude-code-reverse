/**
 * Formats a sequence of values from the MG lookup table as a GUID-like string.
 *
 * This function takes an array of indices, looks up each value in the global MG array,
 * and concatenates them into a string formatted as XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX,
 * similar to a standard GUID/UUID format. The starting index can be offset with the startIndex parameter.
 *
 * @param {number[]} mgIndices - An array of indices to look up in the MG array. Should have at least 16 elements from startIndex.
 * @param {number} [startIndex=0] - The starting index in mgIndices from which to begin formatting.
 * @returns {string} The formatted GUID-like string.
 */
function formatMgArrayAsGuid(mgIndices, startIndex = 0) {
  // Extract and concatenate MG values in GUID format: 8-4-4-4-12
  const part1 = MG[mgIndices[startIndex + 0]] + MG[mgIndices[startIndex + 1]] + MG[mgIndices[startIndex + 2]] + MG[mgIndices[startIndex + 3]];
  const part2 = MG[mgIndices[startIndex + 4]] + MG[mgIndices[startIndex + 5]];
  const part3 = MG[mgIndices[startIndex + 6]] + MG[mgIndices[startIndex + 7]];
  const part4 = MG[mgIndices[startIndex + 8]] + MG[mgIndices[startIndex + 9]];
  const part5 = MG[mgIndices[startIndex + 10]] + MG[mgIndices[startIndex + 11]] + MG[mgIndices[startIndex + 12]] + MG[mgIndices[startIndex + 13]] + MG[mgIndices[startIndex + 14]] + MG[mgIndices[startIndex + 15]];

  // Combine all parts with dashes to form the GUID-like string
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

module.exports = formatMgArrayAsGuid;