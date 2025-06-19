/**
 * Checks if the provided value is a non-null object that implements the async iterator protocol.
 *
 * @param {any} value - The value to check for async iterable compliance.
 * @returns {boolean} True if the value is a non-null object with a [Symbol.asyncIterator] method, otherwise false.
 */
const isAsyncIterableObject = (value) => {
  // Ensure the value is not null and is of type 'object'
  if (value == null || typeof value !== "object") {
    return false;
  }

  // Check if the object has a [Symbol.asyncIterator] method
  return typeof value[Symbol.asyncIterator] === "function";
};

module.exports = isAsyncIterableObject;
