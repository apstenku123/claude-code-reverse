/**
 * Synchronizes an observable source with the provided configuration using dF1.sync.
 * If an error occurs and the configuration specifies to ignore errors, or if the error code is 'EACCES',
 * the function returns false. Otherwise, the error is thrown.
 *
 * @param {any} sourceObservable - The observable or data source to synchronize.
 * @param {Object} [config={}] - Optional configuration object. May include 'ignoreErrors' boolean property.
 * @returns {any|boolean} - The result of dF1.sync, or false if errors are ignored or access is denied.
 */
function syncObservableWithConfig(sourceObservable, config = {}) {
  try {
    // Attempt to synchronize the observable with the provided configuration
    return dF1.sync(sourceObservable, config);
  } catch (error) {
    // If config requests to ignore errors, or the error is a permission error, return false
    if ((config && config.ignoreErrors) || error.code === "EACCES") {
      return false;
    } else {
      // Otherwise, rethrow the error
      throw error;
    }
  }
}

module.exports = syncObservableWithConfig;