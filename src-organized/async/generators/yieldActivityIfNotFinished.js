/**
 * Yields all values from the addActivityIfNotFinished generator function.
 *
 * This async generator delegates iteration to the provided addActivityIfNotFinished function,
 * which is expected to be an async generator. It does not use the source parameter, but keeps isBlobOrFileLikeObject
 * for interface compatibility or future use.
 *
 * @async
 * @generator
 * @function yieldActivityIfNotFinished
 * @category utility
 * @param {*} sourceObservable - (Unused) The source observable or input, reserved for future use or interface compatibility.
 * @param {Function} addActivityIfNotFinished - An async generator function that yields activities if the process is not finished.
 * @yields {*} Yields all values from the addActivityIfNotFinished generator.
 */
async function* yieldActivityIfNotFinished(sourceObservable, addActivityIfNotFinished) {
  // Delegate yielding to the addActivityIfNotFinished generator function
  return yield* addActivityIfNotFinished();
}

module.exports = yieldActivityIfNotFinished;
