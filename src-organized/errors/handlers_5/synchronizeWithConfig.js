/**
 * Attempts to synchronize the provided source with the given configuration.
 * If an error occurs and the configuration specifies to ignore errors, or if the error code is 'EACCES',
 * the function returns false. Otherwise, the error is thrown.
 *
 * @param {any} source - The source object or data to be synchronized.
 * @param {Object} [config={}] - Optional configuration object. May include 'ignoreErrors' boolean property.
 * @returns {any|boolean} The result of dF1.sync if successful, or false if errors are ignored or access is denied.
 */
function synchronizeWithConfig(source, config = {}) {
  try {
    // Attempt to synchronize using dF1.sync with the provided source and config
    return dF1.sync(source, config);
  } catch (error) {
    // If config requests to ignore errors, or the error is due to access permissions, return false
    if ((config && config.ignoreErrors) || error.code === "EACCES") {
      return false;
    } else {
      // Otherwise, rethrow the error
      throw error;
    }
  }
}

module.exports = synchronizeWithConfig;