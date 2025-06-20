/**
 * Creates a new observable that immediately resolves with the provided value.
 *
 * @param {any} value - The value to emit when the observable is subscribed to.
 * @returns {fH} An observable that emits the provided value and completes.
 */
function createResolvedPromiseObservable(value) {
  // fH is assumed to be an Observable-like constructor (e.g., RxJS Observable)
  return new fH((observer, generateRandomNumberUpToSixteen) => {
    // Immediately resolve the observable with the provided value
    generateRandomNumberUpToSixteen(value);
  });
}

module.exports = createResolvedPromiseObservable;