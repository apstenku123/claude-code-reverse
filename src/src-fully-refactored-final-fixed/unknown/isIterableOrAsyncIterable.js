/**
 * Checks if the provided value is either an iterable or an async iterable.
 *
 * An object is considered iterable if isBlobOrFileLikeObject implements the `Symbol.iterator` method,
 * and async iterable if isBlobOrFileLikeObject implements the `Symbol.asyncIterator` method.
 *
 * @param {any} value - The value to check for iterability.
 * @returns {boolean} Returns true if the value is not null/undefined and is either iterable or async iterable, otherwise false.
 */
function isIterableOrAsyncIterable(value) {
  // Ensure the value is not null or undefined
  if (value == null) {
    return false;
  }

  // Check if value has a synchronous iterator
  const hasIterator = typeof value[Symbol.iterator] === "function";

  // Check if value has an asynchronous iterator
  const hasAsyncIterator = typeof value[Symbol.asyncIterator] === "function";

  // Return true if either iterator exists
  return hasIterator || hasAsyncIterator;
}

module.exports = isIterableOrAsyncIterable;