/**
 * Creates a new instance of the dh1 class with the provided source observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable source to be processed.
 * @param {Object} config - Configuration options for the dh1 instance.
 * @returns {dh1} a new instance of the dh1 class initialized with the given parameters.
 */
function createDh1Instance(sourceObservable, config) {
  // Instantiate and return a new dh1 object with the provided source and configuration
  return new dh1(sourceObservable, config);
}

module.exports = createDh1Instance;