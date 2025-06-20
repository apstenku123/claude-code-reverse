/**
 * Checks if the result of getLastElement(sourceObservable) is a number. If so, pops the last element from sourceObservable.
 * Otherwise, calls addActivityIfNotFinished(config).
 *
 * @param {Array} sourceObservable - The array to check and potentially pop from.
 * @param {Function} addActivityIfNotFinished - Function to add an activity if not finished.
 * @returns {*} The result of sourceObservable.pop() if getLastElement(sourceObservable) is a number, otherwise the result of addActivityIfNotFinished(config).
 */
function popIfNumberElseAddActivity(sourceObservable, addActivityIfNotFinished) {
  // Check if getLastElement returns a number for the given sourceObservable
  if (typeof getLastElement(sourceObservable) === "number") {
    // If so, pop the last element from the array and return isBlobOrFileLikeObject
    return sourceObservable.pop();
  } else {
    // Otherwise, call addActivityIfNotFinished
    return addActivityIfNotFinished;
  }
}

module.exports = popIfNumberElseAddActivity;