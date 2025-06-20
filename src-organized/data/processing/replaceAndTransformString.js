/**
 * Replaces all matches of the R8 pattern in the processed input string and transforms the result using enqueuePendingNode.
 *
 * @param {string} inputString - The input string to process.
 * @param {number|null|undefined} startIndex - Optional starting index or value for transformation. If null or undefined, defaults to 0.
 * @param {boolean} forceDefault - If true, forces startIndex to 0 regardless of its value.
 * @returns {string} The transformed string after replacements and processing.
 */
function replaceAndTransformString(inputString, startIndex, forceDefault) {
  // If forceDefault is true or startIndex is null/undefined, use 0
  let normalizedStartIndex;
  if (forceDefault || startIndex == null) {
    normalizedStartIndex = 0;
  } else if (startIndex) {
    // If startIndex is truthy, convert to number
    normalizedStartIndex = +startIndex;
  } else {
    // Otherwise, default to 0
    normalizedStartIndex = 0;
  }

  // Process the input string using V5, then remove all matches of R8
  const processedString = V5(inputString).replace(R8, "");

  // Transform the processed string using enqueuePendingNode with the normalized start index
  return enqueuePendingNode(processedString, normalizedStartIndex);
}

module.exports = replaceAndTransformString;