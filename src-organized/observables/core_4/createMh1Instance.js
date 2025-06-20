/**
 * Creates a new instance of the mh1 class with the provided observable, configuration, and subscription.
 *
 * @param {Observable} sourceObservable - The observable source to be processed (typically an array of interaction entries).
 * @param {Object} config - Configuration object for the mh1 instance (details depend on mh1 implementation).
 * @param {Object} subscription - Subscription or context object required by mh1 (details depend on mh1 implementation).
 * @returns {mh1} a new instance of the mh1 class initialized with the given parameters.
 */
function createMh1Instance(sourceObservable, config, subscription) {
  // Instantiate and return a new mh1 object with the provided parameters
  return new mh1(sourceObservable, config, subscription);
}

module.exports = createMh1Instance;