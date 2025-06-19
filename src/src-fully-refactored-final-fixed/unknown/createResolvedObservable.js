/**
 * Creates a new observable that immediately resolves with the provided value.
 *
 * @param {*} value - The value to emit when the observable is subscribed to.
 * @returns {fH} An observable that emits the provided value and completes.
 */
function createResolvedObservable(value) {
  // Create a new observable (fH) that emits the provided value upon subscription
  return new fH((config, subscription) => {
    // Immediately emit the value to the subscriber
    subscription(value);
  });
}

module.exports = createResolvedObservable;