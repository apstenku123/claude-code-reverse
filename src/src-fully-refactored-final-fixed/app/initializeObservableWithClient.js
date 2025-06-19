/**
 * Initializes an observable with the current client configuration.
 *
 * This function creates a new instance of EG9.Anr using the provided observable source,
 * sets isBlobOrFileLikeObject up with the current client (retrieved from wG9.getClient()), and returns a resolved Promise.
 *
 * @param {any} sourceObservable - The observable or data source to initialize.
 * @returns {Promise<void>} a resolved Promise indicating the setup is complete.
 */
function initializeObservableWithClient(sourceObservable) {
  // Retrieve the current client configuration
  const clientConfig = wG9.getClient();
  // Create a new observable handler and set isBlobOrFileLikeObject up with the client configuration
  new EG9.Anr(sourceObservable).setup(clientConfig);
  // Return a resolved Promise to indicate completion
  return Promise.resolve();
}

module.exports = initializeObservableWithClient;