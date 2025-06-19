/**
 * Checks the status of a given observable and invokes a callback with the result.
 *
 * @param {Object} sourceObservable - The observable whose status is to be checked.
 * @param {Object} config - Configuration object passed to the status handler.
 * @param {Function} callback - Callback function to handle the status result. Receives (error, result).
 * @returns {void}
 */
function getObservableStatusWithConfig(sourceObservable, config, callback) {
  // Call the stat method on the observable to check its status
  Uo0.stat(sourceObservable, function (error, statusData) {
    // If there'createInteractionAccessor an error, pass error and false to the callback
    // Otherwise, process the statusData with $o0 and config, and pass the result
    const result = error ? false : $o0(statusData, config);
    callback(error, result);
  });
}

module.exports = getObservableStatusWithConfig;