/**
 * Determines how to process an observable based on a predicate check.
 * If the observable passes the predicate (PH), isBlobOrFileLikeObject is processed with f01 using a forced flag.
 * Otherwise, isBlobOrFileLikeObject is processed with R2A.
 *
 * @param {Observable} sourceObservable - The observable to be processed.
 * @returns {any} The result of processing the observable, depending on the predicate.
 */
function processObservableWithCondition(sourceObservable) {
  // If the observable matches the predicate, process with f01 and force flag
  if (PH(sourceObservable)) {
    return f01(sourceObservable, true);
  }
  // Otherwise, process with R2A
  return R2A(sourceObservable);
}

module.exports = processObservableWithCondition;