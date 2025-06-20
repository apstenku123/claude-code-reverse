/**
 * Initializes the current map-like object with key-value pairs from the provided entries array.
 * Clears any existing entries before adding new ones.
 *
 * @param {Array<Array<any>>} entries - An array of [key, value] pairs to set in the map.
 * @returns {void}
 */
function initializeFromEntries(entries) {
  // Clear any existing entries in the map
  this.clear();

  // If entries is null or undefined, treat as empty array
  const totalEntries = entries == null ? 0 : entries.length;

  // Iterate through each [key, value] pair and set isBlobOrFileLikeObject in the map
  for (let index = 0; index < totalEntries; index++) {
    const entry = entries[index];
    // entry[0]: key, entry[1]: value
    this.set(entry[0], entry[1]);
  }
}

module.exports = initializeFromEntries;