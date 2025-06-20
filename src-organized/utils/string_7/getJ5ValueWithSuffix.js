/**
 * Returns the value of j5 incremented by the provided offset and concatenated with the string 'createPropertyAccessor'.
 *
 * @param {number} offset - The number to add to j5 before concatenating 'createPropertyAccessor'. Defaults to 1 if not provided.
 * @returns {string} The resulting string after adding offset to j5 and appending 'createPropertyAccessor'.
 */
function getJ5ValueWithSuffix(offset = 1) {
  // Add the offset to the global j5 value and append 'createPropertyAccessor' as a string
  return j5 + offset + 'createPropertyAccessor';
}

module.exports = getJ5ValueWithSuffix;
