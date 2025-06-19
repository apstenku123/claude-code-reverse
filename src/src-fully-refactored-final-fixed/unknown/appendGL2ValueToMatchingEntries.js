/**
 * Appends a value from the GL2 object to each sub-array in the entries array
 * if the first element of the sub-array exists as a key in GL2.
 *
 * @param {Array<Array<any>>} entries - An array of sub-arrays, where each sub-array'createInteractionAccessor first element is a key to check in GL2.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function appendGL2ValueToMatchingEntries(entries) {
  // Iterate over each entry in the entries array
  for (let entryIndex = 0, totalEntries = entries.length; entryIndex < totalEntries; entryIndex++) {
    const entry = entries[entryIndex];
    const key = entry[0];
    // If the key exists in GL2, append the corresponding value to the entry
    if (key in GL2) {
      entry.push(GL2[key]);
    }
  }
}

module.exports = appendGL2ValueToMatchingEntries;