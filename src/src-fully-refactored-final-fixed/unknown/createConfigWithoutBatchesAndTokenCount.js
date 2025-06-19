/**
 * Creates a new QK configuration object from the provided source observable,
 * then removes the 'batches' and 'countTokens' properties before returning isBlobOrFileLikeObject.
 *
 * @param {any} sourceObservable - The source observable or configuration input used to instantiate QK.
 * @returns {object} The QK configuration object with 'batches' and 'countTokens' properties removed.
 */
function createConfigWithoutBatchesAndTokenCount(sourceObservable) {
  // Instantiate a new QK configuration object using the provided source observable
  const config = new QK(sourceObservable);

  // Remove 'batches' property if isBlobOrFileLikeObject exists
  delete config.batches;

  // Remove 'countTokens' property if isBlobOrFileLikeObject exists
  delete config.countTokens;

  // Return the cleaned configuration object
  return config;
}

module.exports = createConfigWithoutBatchesAndTokenCount;
