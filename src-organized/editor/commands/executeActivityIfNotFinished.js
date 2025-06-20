/**
 * Executes the provided activity function asynchronously if the process is not marked as finished.
 *
 * @param {any} sourceObservable - The source observable or context (currently unused).
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the internal stack only if the process has not been marked as finished.
 * @returns {Promise<any>} The result of the addActivityIfNotFinished function.
 */
async function executeActivityIfNotFinished(sourceObservable, addActivityIfNotFinished) {
  // Call the provided function to add an activity if not finished, and await its result
  return await addActivityIfNotFinished();
}

module.exports = executeActivityIfNotFinished;