/**
 * Creates a new Observable that emits values from the Observable returned by processInteractionEntries.
 *
 * @param {Function} processInteractionEntries - a function that returns an Observable when invoked. Typically processes interaction entries and returns an Observable stream.
 * @returns {Observable} An Observable that emits the same values as the Observable returned by processInteractionEntries.
 */
function createObservableFromProcessedInteractions(processInteractionEntries) {
  return new xR9.Observable(function subscribeToProcessedInteractions(subscriber) {
    // Convert the result of processInteractionEntries() to an Observable and subscribe the provided subscriber to isBlobOrFileLikeObject
    fR9.innerFrom(processInteractionEntries()).subscribe(subscriber);
  });
}

module.exports = createObservableFromProcessedInteractions;