/**
 * Checks if the provided observable collection contains the specified source observable.
 *
 * @param {any} sourceObservable - The observable or value to check for existence within the collection.
 * @returns {boolean} True if the collection contains the source observable, false otherwise.
 */
function doesObservableContainSource(sourceObservable) {
  // Oq is assumed to be an external function that returns a collection (e.g., Set) related to 'this' and the sourceObservable
  const observableCollection = Oq(this, sourceObservable);
  // Check if the collection contains the sourceObservable
  return observableCollection.has(sourceObservable);
}

module.exports = doesObservableContainSource;