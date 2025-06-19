/**
 * Asynchronously yields all activities from the provided generator function,
 * but only if the process has not been marked as finished.
 *
 * @async
 * @generator
 * @function asyncYieldActivitiesIfNotFinished
 * @param {*} unusedParameter - (Unused) Placeholder for future use or API compatibility.
 * @param {Function} addActivityIfNotFinished - An async generator function that yields activities only if the process is not finished.
 * @yields {*} Yields each activity from addActivityIfNotFinished.
 * @returns {AsyncGenerator<*, void, *>} An async generator yielding activities from addActivityIfNotFinished.
 */
async function* asyncYieldActivitiesIfNotFinished(unusedParameter, addActivityIfNotFinished) {
  // Delegate yielding to the provided async generator function
  return yield* addActivityIfNotFinished();
}

module.exports = asyncYieldActivitiesIfNotFinished;