/**
 * Initializes the storage system with the provided configuration object.
 *
 * This function extends the global storage adapter (closeObservable) with the given configuration,
 * performs any necessary pre-initialization steps, and then initializes the storage backend.
 * The initialized storage promise is stored in closeObservable._ready and returned.
 *
 * @param {Object} storageConfig - Configuration object for the storage adapter.
 * @returns {Promise<any>} a promise that resolves when the storage is ready.
 */
function initializeStorageWithConfig(storageConfig) {
  // Extend the global storage adapter with the provided configuration
  closeObservable._extend(storageConfig);

  // Perform any required pre-initialization steps
  initializeDriverInConfig();

  // Initialize the storage backend and store the resulting promise
  closeObservable._ready = closeObservable._initStorage(closeObservable._config);

  // Return the promise indicating when storage is ready
  return closeObservable._ready;
}

module.exports = initializeStorageWithConfig;