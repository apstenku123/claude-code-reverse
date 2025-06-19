/**
 * Determines if the provided observable is the source observable used for processing interaction entries.
 *
 * @param {any} observable - The observable to check against the source observable.
 * @returns {boolean} True if the provided observable is the source observable; otherwise, false.
 */
function isSourceObservable(observable) {
  // Compare the provided observable to the source observable reference
  return observable === sourceObservable;
}

module.exports = isSourceObservable;