/**
 * Creates a new instance of the NY class using the provided source observable.
 *
 * @param {any} sourceObservable - The observable or data source to be wrapped by the NY class.
 * @returns {NY} a new instance of the NY class initialized with the given source observable.
 */
function createNyInstance(sourceObservable) {
  // Instantiate and return a new NY object with the provided source observable
  return new NY(sourceObservable);
}

module.exports = createNyInstance;