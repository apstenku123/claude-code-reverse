/**
 * Creates a new observable process from the provided source observable.
 *
 * @param {Observable} sourceObservable - The observable to process.
 * @returns {Observable} a new observable created by processing the source observable.
 */
const createProcessObservable = (sourceObservable) => {
  // Delegate to Rf6.fromProcess to create a new observable from the source
  return Rf6.fromProcess(sourceObservable);
};

module.exports = createProcessObservable;