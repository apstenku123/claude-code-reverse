/**
 * Retrieves a key for an observable, either by delegating to generateInteractionHash with configuration and subscription,
 * or by generating a hash using GCA._DJB2 if no configuration is provided.
 *
 * @param {string} sourceObservable - The identifier or name of the source observable.
 * @param {object|null} config - Optional configuration object. If provided, a custom key is generated.
 * @param {object} subscription - The subscription object associated with the observable.
 * @returns {string} The generated key or hash for the observable.
 */
function getObservableKeyOrHash(sourceObservable, config, subscription) {
  // If a configuration object is provided, use generateInteractionHash to generate a key
  if (config) {
    return generateInteractionHash(sourceObservable, config, subscription);
  }
  // Otherwise, generate a hash key using GCA._DJB2 with a prefixed string
  return GCA._DJB2(`k:${sourceObservable}`);
}

module.exports = getObservableKeyOrHash;