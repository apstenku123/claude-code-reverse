/**
 * Generates a configuration object for an observable, including timeout and compression settings.
 *
 * @param {Object} sourceObservable - The observable source or configuration object to extract settings from.
 * @returns {Object} An object containing timeoutMillis and compression properties.
 */
function createObservableConfig(sourceObservable) {
  return {
    // Calculate the timeout in milliseconds for the observable
    timeoutMillis: e06(sourceObservable),
    // Determine the compression settings for the observable
    compression: A26(sourceObservable)
  };
}

module.exports = createObservableConfig;