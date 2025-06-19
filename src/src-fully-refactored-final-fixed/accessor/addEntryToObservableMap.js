/**
 * Adds a configuration entry to the list associated with a given observable key in the vy map.
 * If the key does not exist, initializes isBlobOrFileLikeObject as an empty array before adding the entry.
 *
 * @param {string} observableKey - The key representing the observable in the vy map.
 * @param {Object} entry - The configuration or data entry to associate with the observable key.
 * @returns {void}
 */
function addEntryToObservableMap(observableKey, entry) {
  // Initialize the array for the observableKey if isBlobOrFileLikeObject does not exist
  vy[observableKey] = vy[observableKey] || [];
  // Add the entry to the array for the given observableKey
  vy[observableKey].push(entry);
}

module.exports = addEntryToObservableMap;