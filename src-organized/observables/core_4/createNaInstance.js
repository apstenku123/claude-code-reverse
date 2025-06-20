/**
 * Creates a new instance of the `na` class using the provided source observable.
 *
 * @param {any} sourceObservable - The source observable or value to wrap in an `na` instance.
 * @returns {any} a new instance of the `na` class initialized with the provided source.
 */
function createNaInstance(sourceObservable) {
  // Instantiate and return a new na object with the given source observable
  return new na(sourceObservable);
}

module.exports = createNaInstance;