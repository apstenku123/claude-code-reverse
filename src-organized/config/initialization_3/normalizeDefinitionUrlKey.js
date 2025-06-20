/**
 * Updates the key 'definitionurl' to 'definitionURL' in the first matching sub-array within the provided entries array.
 *
 * @param {Array<Array<any>>} entries - An array of arrays, where each sub-array represents a key-value pair or similar structure.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function normalizeDefinitionUrlKey(entries) {
  // Iterate through each entry in the array
  for (let index = 0; index < entries.length; index++) {
    // Check if the first element of the sub-array is the string 'definitionurl'
    if (entries[index][0] === "definitionurl") {
      // Update the key to 'definitionURL' (camelCase)
      entries[index][0] = "definitionURL";
      // Stop after the first replacement
      break;
    }
  }
}

module.exports = normalizeDefinitionUrlKey;