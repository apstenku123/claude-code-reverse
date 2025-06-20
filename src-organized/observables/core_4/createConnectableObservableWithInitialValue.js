/**
 * Creates a function that, when given a source observable, returns a ConnectableObservable
 * initialized with a BehaviorSubject seeded with the provided initial value.
 *
 * @param {any} initialValue - The initial value to seed the BehaviorSubject.
 * @returns {function} a function that takes a source observable and returns a ConnectableObservable.
 */
function createConnectableObservableWithInitialValue(initialValue) {
  return function connectableObservableFactory(sourceObservable) {
    // Create a BehaviorSubject seeded with the initial value
    const subject = new gj9.BehaviorSubject(initialValue);
    // Return a ConnectableObservable using the provided source and subject factory
    return new hj9.ConnectableObservable(
      sourceObservable,
      () => subject
    );
  };
}

module.exports = createConnectableObservableWithInitialValue;