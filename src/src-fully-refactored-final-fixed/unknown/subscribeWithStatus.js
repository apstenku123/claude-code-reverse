/**
 * Subscribes to a source observable, retrieves its status, and invokes a callback with the result.
 *
 * @param {object} sourceObservable - The observable or resource to check status for.
 * @param {object} config - Configuration object to be passed to the status handler.
 * @param {function} subscriptionCallback - Callback function to be invoked with the status result.
 * @returns {void}
 */
function subscribeWithStatus(sourceObservable, config, subscriptionCallback) {
  Uo0.stat(sourceObservable, function (error, status) {
    // If there is an error, pass the error and false to the callback
    // Otherwise, pass null and the result of $o0(status, config)
    subscriptionCallback(error, error ? false : $o0(status, config));
  });
}

module.exports = subscribeWithStatus;