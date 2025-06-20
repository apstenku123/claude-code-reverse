/**
 * Creates a new observable that emits the provided value immediately upon subscription.
 *
 * @param {any} value - The value to emit when the observable is subscribed to.
 * @returns {Observable} An observable that emits the provided value.
 */
function createObservableFromValue(value) {
  // fH is assumed to be a constructor for creating observables
  return new fH(function emitValue(subscriber) {
    // Emit the provided value to the subscriber
    subscriber(value);
  });
}

module.exports = createObservableFromValue;