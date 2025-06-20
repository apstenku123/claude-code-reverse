/**
 * Creates a new NY instance from the provided observable source.
 *
 * @function createNyInstanceFromObservable
 * @param {Observable} sourceObservable - The observable source to be wrapped by the NY class.
 * @returns {NY} a new instance of the NY class initialized with the given observable.
 */
const createNyInstanceFromObservable = (sourceObservable) => {
  // Instantiate and return a new NY object with the given observable
  return new NY(sourceObservable);
};

module.exports = createNyInstanceFromObservable;