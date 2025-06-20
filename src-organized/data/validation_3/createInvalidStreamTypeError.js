/**
 * Creates a TypeError indicating that an invalid value was provided where a stream was expected.
 *
 * @param {*} providedValue - The value that was provided instead of a valid stream.
 * @returns {TypeError} a TypeError with a descriptive message about the invalid input.
 */
function createInvalidStreamTypeError(providedValue) {
  // Determine if the provided value is a non-null object
  const isInvalidObject = providedValue !== null && typeof providedValue === "object";

  // Construct a descriptive error message based on the type of the provided value
  const errorMessage =
    "You provided " +
    (isInvalidObject
      ? "an invalid object"
      : "'" + providedValue + "'") +
    " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.";

  // Return a new TypeError with the constructed message
  return new TypeError(errorMessage);
}

module.exports = createInvalidStreamTypeError;