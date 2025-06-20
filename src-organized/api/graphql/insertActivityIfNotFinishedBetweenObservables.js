/**
 * Inserts an activity (if not finished) between each element of the observable sequence, except before the first element.
 *
 * @param {Array} observableSequence - The array of observables (or subscriptions) to process.
 * @param {Function} addActivityIfNotFinished - Function that, given an index, returns an activity to insert if the process is not finished.
 * @returns {Array} a new array with activities inserted between observables, except before the first one.
 */
function insertActivityIfNotFinishedBetweenObservables(observableSequence, addActivityIfNotFinished) {
  return observableSequence.flatMap((subscription, index) => {
    // For the first element, just return isBlobOrFileLikeObject as is
    if (index === 0) {
      return [subscription];
    }
    // For subsequent elements, insert the activity before the subscription
    return [addActivityIfNotFinished(index), subscription];
  });
}

module.exports = insertActivityIfNotFinishedBetweenObservables;