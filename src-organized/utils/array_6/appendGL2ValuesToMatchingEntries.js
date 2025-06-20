/**
 * Appends corresponding values from the GL2 object to each entry in the input array whose first element matches a key in GL2.
 *
 * @param {Array<Array>} entries - An array of arrays, where each sub-array'createInteractionAccessor first element is used as a key to look up in GL2.
 * @returns {void} This function modifies the input array in place and does not return anything.
 */
function appendGL2ValuesToMatchingEntries(entries) {
  // Iterate over each entry in the input array
  for (let index = 0, totalEntries = entries.length; index < totalEntries; index++) {
    const entry = entries[index];
    const key = entry[0];
    // If the key exists in GL2, append the corresponding value to the entry
    if (key in GL2) {
      entry.push(GL2[key]);
    }
  }
}

module.exports = appendGL2ValuesToMatchingEntries;