/**
 * Delegates iteration to another async generator function.
 *
 * This utility async generator function yields all values from the provided async generator function.
 * It is useful for composing or re-exporting async generator sequences.
 *
 * @async
 * @generator
 * @function delegateAsyncGenerator
 * @param {any} unusedParameter - An unused parameter, reserved for future use or API compatibility.
 * @param {Function} asyncGeneratorFunction - a function that returns an async generator to delegate to.
 * @yields {any} Yields all values from the delegated async generator.
 * @returns {AsyncGenerator} An async generator yielding values from the delegated generator.
 */
async function* delegateAsyncGenerator(unusedParameter, asyncGeneratorFunction) {
  // Delegate all yields to the provided async generator function
  return yield* asyncGeneratorFunction();
}

module.exports = delegateAsyncGenerator;
