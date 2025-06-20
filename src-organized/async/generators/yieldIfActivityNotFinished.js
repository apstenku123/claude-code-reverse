/**
 * Delegates yielding to the provided activity generator function if the activity is not finished.
 *
 * @async
 * @generator
 * @function yieldIfActivityNotFinished
 * @category utility
 * @param {*} context - The context or state object (currently unused, reserved for future use).
 * @param {Function} addActivityIfNotFinished - a generator function that adds a new activity to the activity stack only if the process has not been marked as finished.
 * @yields {*} - Yields all values from the addActivityIfNotFinished generator.
 * @returns {Generator} - Returns the generator from addActivityIfNotFinished.
 */
async function* yieldIfActivityNotFinished(context, addActivityIfNotFinished) {
  // Delegate yielding to the addActivityIfNotFinished generator function
  return yield* addActivityIfNotFinished();
}

module.exports = yieldIfActivityNotFinished;