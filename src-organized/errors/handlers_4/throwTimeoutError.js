/**
 * Throws a TimeoutError with the provided message or context.
 *
 * @function throwTimeoutError
 * @category app
 * @module /Users/davegornshtein/Documents/test22/1.0.19/src/app/throwTimeoutError.js
 * @param {any} errorContext - The message or context to include in the TimeoutError.
 * @throws {DUA.TimeoutError} Always throws a TimeoutError with the provided context.
 */
function throwTimeoutError(errorContext) {
  // Always throw a TimeoutError from the DUA library with the given context
  throw new DUA.TimeoutError(errorContext);
}

module.exports = throwTimeoutError;