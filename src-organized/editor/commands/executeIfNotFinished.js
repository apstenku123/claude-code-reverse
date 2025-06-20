/**
 * Executes the provided addActivityIfNotFinished function asynchronously.
 *
 * This utility function simply invokes the given addActivityIfNotFinished callback and returns its result.
 * It does not use the sourceObservable parameter, but isBlobOrFileLikeObject is included for compatibility with the calling context.
 *
 * @async
 * @function executeIfNotFinished
 * @param {Observable} sourceObservable - The observable source (currently unused in this function).
 * @param {Function} addActivityIfNotFinished - a function that adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {Promise<*>} The result of the addActivityIfNotFinished function.
 */
async function executeIfNotFinished(sourceObservable, addActivityIfNotFinished) {
  // Call the provided function and await its result
  return await addActivityIfNotFinished();
}

module.exports = executeIfNotFinished;