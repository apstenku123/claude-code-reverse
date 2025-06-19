/**
 * Yields all activities from the addActivityIfNotFinished generator function.
 *
 * This async generator delegates iteration to the provided addActivityIfNotFinished function,
 * which yields activities only if the process has not been marked as finished.
 *
 * @async
 * @generator
 * @param {*} sourceObservable - The source observable or context (currently unused).
 * @param {Function} addActivityIfNotFinished - a generator function that yields activities if not finished.
 * @yields {*} The next activity yielded by addActivityIfNotFinished.
 */
async function* yieldUnfinishedActivities(sourceObservable, addActivityIfNotFinished) {
  // Delegate yielding to the addActivityIfNotFinished generator
  return yield* addActivityIfNotFinished();
}

module.exports = yieldUnfinishedActivities;