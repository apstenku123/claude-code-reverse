/**
 * Initializes an EG9.Anr instance with the provided observable and sets isBlobOrFileLikeObject up with the current client.
 *
 * @param {any} sourceObservable - The observable or data source to be passed to EG9.Anr.
 * @returns {Promise<void>} Resolves immediately after setup is complete.
 */
function initializeAnrWithClient(sourceObservable) {
  // Retrieve the current client configuration from wG9
  const clientConfig = wG9.getClient();
  // Create a new Anr instance with the provided observable and set isBlobOrFileLikeObject up with the client configuration
  new EG9.Anr(sourceObservable).setup(clientConfig);
  // Return a resolved promise to maintain asynchronous contract
  return Promise.resolve();
}

module.exports = initializeAnrWithClient;