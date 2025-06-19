/**
 * Creates a new Observable from an object that implements Symbol.observable.
 * Throws a TypeError if the provided object does not correctly implement Symbol.observable.
 *
 * @param {Object} sourceObservable - An object expected to implement Symbol.observable.
 * @returns {Observable} a new Observable that mirrors the behavior of the source observable.
 * @throws {TypeError} If the provided object does not correctly implement Symbol.observable.
 */
function createObservableFromSymbol(sourceObservable) {
  return new zf.Observable(function subscribeToSource(subscriber) {
    // Attempt to retrieve the observable implementation from the source object
    const observableImplementation = sourceObservable[XM9.observable]();
    // Check if the implementation has a subscribe method
    if (FM9.isFunction(observableImplementation.subscribe)) {
      // Delegate subscription to the source'createInteractionAccessor subscribe method
      return observableImplementation.subscribe(subscriber);
    }
    // Throw an error if the object does not properly implement Symbol.observable
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}

module.exports = createObservableFromSymbol;