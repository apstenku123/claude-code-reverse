/**
 * Determines whether a given observable should be processed based on its presence in exclusion and inclusion sets, and a global processing flag.
 *
 * @param {any} observable - The observable to check for processing eligibility.
 * @returns {boolean} True if the observable should be processed; otherwise, false.
 */
function shouldProcessObservable(observable) {
  // Check if the observable is not in the exclusion set
  // and either the global processing flag is true
  // or the observable is in the inclusion set
  return !excludedObservables.has(observable) && (isProcessingEnabled || includedObservables.has(observable));
}

module.exports = shouldProcessObservable;