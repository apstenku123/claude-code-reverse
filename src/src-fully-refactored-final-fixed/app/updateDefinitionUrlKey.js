/**
 * Updates the first occurrence of the key 'definitionurl' to 'definitionURL' in a nested array.
 *
 * @param {Array<Array<any>>} entries - An array of entries, each being an array where the first element is a key string.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function updateDefinitionUrlKey(entries) {
  // Iterate over each entry in the array
  for (let index = 0; index < entries.length; index++) {
    // Check if the first element of the entry is the string 'definitionurl'
    if (entries[index][0] === "definitionurl") {
      // Update the key to 'definitionURL'
      entries[index][0] = "definitionURL";
      // Only update the first occurrence, then exit the loop
      break;
    }
  }
}

module.exports = updateDefinitionUrlKey;