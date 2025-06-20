/**
 * Creates a configuration object from the provided source observable, removing the 'batches' property from its messages.
 *
 * @param {any} sourceObservable - The source observable or data used to instantiate the configuration object.
 * @returns {object} The configuration object with the 'batches' property removed from its messages.
 */
function createConfigWithoutBatches(sourceObservable) {
  // Instantiate the configuration object using the external dX constructor
  const config = new dX(sourceObservable);

  // Remove the 'batches' property from the messages object, if isBlobOrFileLikeObject exists
  delete config.messages.batches;

  // Return the modified configuration object
  return config;
}

module.exports = createConfigWithoutBatches;