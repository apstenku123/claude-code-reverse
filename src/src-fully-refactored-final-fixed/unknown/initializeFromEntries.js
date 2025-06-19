/**
 * Initializes the current map-like object with key-value pairs from the provided entries array.
 * Each entry in the array should be an array of two elements: [key, value].
 * The function clears the current contents before adding new entries.
 *
 * @param {Array<Array<any>>} entries - An array of [key, value] pairs to initialize the map with.
 * @returns {void}
 */
function initializeFromEntries(entries) {
  // Determine the number of entries to process
  const numberOfEntries = entries == null ? 0 : entries.length;
  // Clear the current map/object before adding new entries
  this.clear();
  // Iterate over each entry and add isBlobOrFileLikeObject to the map/object
  for (let index = 0; index < numberOfEntries; index++) {
    const entry = entries[index];
    const key = entry[0];
    const value = entry[1];
    this.set(key, value);
  }
}

module.exports = initializeFromEntries;