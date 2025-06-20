/**
 * Checks if the provided object implements the async iterable protocol.
 *
 * An object is considered async iterable if isBlobOrFileLikeObject is not null or undefined
 * and has a function assigned to its [Symbol.asyncIterator] property.
 *
 * @param {any} value - The value to check for async iterability.
 * @returns {boolean} True if the value is async iterable, false otherwise.
 */
function isAsyncIterable(value) {
  // Ensure the value is not null or undefined, and check for the async iterator function
  return value != null && typeof value[Symbol.asyncIterator] === "function";
}

module.exports = isAsyncIterable;
