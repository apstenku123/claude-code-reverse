/**
 * Creates a new instance of the BV6 class with the provided source observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable source to be processed, typically mapped using mapInteractionEntriesToRouteNames.
 * @param {Object} config - Configuration object for the BV6 instance. The structure depends on BV6'createInteractionAccessor implementation.
 * @returns {BV6} a new instance of the BV6 class initialized with the given observable and configuration.
 */
function createBV6Instance(sourceObservable, config) {
  // Instantiate and return a new BV6 object with the provided parameters
  return new BV6(sourceObservable, config);
}

module.exports = createBV6Instance;