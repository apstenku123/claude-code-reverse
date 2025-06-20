/**
 * Initializes the internal data store with the provided entries and updates the size property.
 *
 * @param {Array} initialEntries - An array of entries to initialize the data store with.
 * @returns {void}
 *
 * This function creates a new instance of Lq (the internal data store) using the provided entries,
 * assigns isBlobOrFileLikeObject to the '__data__' property of the current instance, and updates the 'size' property
 * to reflect the number of entries in the data store.
 */
function initializeDataStore(initialEntries) {
  // Create a new data store instance with the provided entries
  const dataStore = this.__data__ = new Lq(initialEntries);
  // Update the size property to match the data store'createInteractionAccessor size
  this.size = dataStore.size;
}

module.exports = initializeDataStore;