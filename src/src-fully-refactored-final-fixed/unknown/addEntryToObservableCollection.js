/**
 * Adds an entry to the observable collection for a given key.
 * If the collection for the key does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as an empty array.
 *
 * @param {string} observableKey - The key identifying the observable collection.
 * @param {any} entry - The entry to add to the observable collection.
 * @returns {void}
 */
function addEntryToObservableCollection(observableKey, entry) {
  // Initialize the collection for the key if isBlobOrFileLikeObject does not exist
  if (!Oc[observableKey]) {
    Oc[observableKey] = [];
  }
  // Add the entry to the collection
  Oc[observableKey].push(entry);
}

module.exports = addEntryToObservableCollection;
