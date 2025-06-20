/**
 * Initializes and sets up an observable with the current client configuration.
 *
 * @param {any} sourceObservable - The observable or data source to be set up.
 * @returns {Promise<void>} a promise that resolves when setup is complete.
 */
function initializeAndSetupObservable(sourceObservable) {
  // Retrieve the current client configuration
  const clientConfig = wG9.getClient();
  // Create a new Anr instance with the provided observable and set isBlobOrFileLikeObject up with the client configuration
  new EG9.Anr(sourceObservable).setup(clientConfig);
  // Return a resolved promise to indicate completion
  return Promise.resolve();
}

module.exports = initializeAndSetupObservable;