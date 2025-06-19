/**
 * Synchronizes an observable source with optional configuration, handling errors gracefully.
 * If an error occurs and the configuration specifies to ignore errors, or if the error code is 'EACCES',
 * the function returns false. Otherwise, the error is re-thrown.
 *
 * @param {any} sourceObservable - The observable or data source to synchronize.
 * @param {Object} [config={}] - Optional configuration object. May include 'ignoreErrors' boolean property.
 * @returns {any|boolean} The result of dF1.sync, or false if an ignorable error occurs.
 */
function safelySyncObservable(sourceObservable, config = {}) {
  try {
    // Attempt to synchronize the observable with the provided configuration
    return dF1.sync(sourceObservable, config);
  } catch (error) {
    // If config.ignoreErrors is true, or the error code is 'EACCES', return false
    if ((config && config.ignoreErrors) || error.code === "EACCES") {
      return false;
    } else {
      // Otherwise, re-throw the error
      throw error;
    }
  }
}

module.exports = safelySyncObservable;