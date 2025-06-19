/**
 * Creates an array containing the provided observable and its configuration.
 *
 * @param {Observable} sourceObservable - The observable to be paired with the configuration.
 * @param {Array} [config=[]] - Optional configuration array associated with the observable.
 * @returns {Array} An array where the first element is the observable and the second is the configuration array.
 */
function createObservableWithConfig(sourceObservable, config = []) {
  // Return an array pairing the observable with its configuration
  return [sourceObservable, config];
}

module.exports = createObservableWithConfig;
