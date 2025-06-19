/**
 * Creates an Observable that emits processed interaction entries.
 *
 * This function wraps the result of the provided processInteractionEntries function
 * (which returns an Observable or subscribable) into a new Observable. It uses
 * fR9.innerFrom to ensure compatibility with various observable-like sources.
 *
 * @param {Function} processInteractionEntries - a function that returns an observable-like object containing processed interaction entries.
 * @returns {Observable} An Observable that emits the processed interaction entries.
 */
function createProcessedInteractionObservable(processInteractionEntries) {
  return new xR9.Observable(function (observer) {
    // Convert the result of processInteractionEntries() to an Observable and subscribe the observer
    fR9.innerFrom(processInteractionEntries()).subscribe(observer);
  });
}

module.exports = createProcessedInteractionObservable;