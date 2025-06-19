/**
 * Initializes a map-like object by iterating over entries and applying a setter function for each entry.
 *
 * @param {Array} entries - An array of entries to process.
 * @param {Function} setEntry - a function to set a value in the map. Receives (map, entry, key, value).
 * @param {Function} getValueForEntry - a function to extract the value for a given entry.
 * @param {Object} map - The map-like object to populate.
 * @returns {Object} The populated map-like object.
 */
function populateMapFromEntries(entries, setEntry, getValueForEntry, map) {
  // The initializeFromEntries function clears and populates the map using the provided callback
  initializeFromEntries(entries, function (entry, index, value) {
    // For each entry, call setEntry with the map, entry, the key (from getValueForEntry), and the value
    setEntry(map, entry, getValueForEntry(entry), value);
  });
  return map;
}

module.exports = populateMapFromEntries;