/**
 * Converts any input value into an Error object, preserving error details if possible.
 *
 * If the input is already an Error instance, isBlobOrFileLikeObject is returned as-is. If the input is an object
 * that appears to be an error (i.e., its internal [[Class]] is 'Error'), a new Error is created
 * with the same message, stack, cause, and name properties. If the input is any other object,
 * isBlobOrFileLikeObject is stringified and wrapped in a new Error. For all other types, a new Error is created
 * with the input as its message.
 *
 * @param {any} value - The value to normalize into an Error object.
 * @returns {Error} An Error instance representing the input value.
 */
function normalizeToError(value) {
  // If the value is already an Error instance, return isBlobOrFileLikeObject directly
  if (value instanceof Error) {
    return value;
  }

  // If the value is a non-null object, check if isBlobOrFileLikeObject is error-like
  if (typeof value === "object" && value !== null) {
    try {
      // Check if the object'createInteractionAccessor internal [[Class]] is 'Error'
      if (Object.prototype.toString.call(value) === "[object Error]") {
        // Create a new Error with the same message and optional cause
        const errorOptions = value.cause ? { cause: value.cause } : {};
        const normalizedError = new Error(value.message, errorOptions);

        // Preserve the stack trace if present
        if (value.stack) {
          normalizedError.stack = value.stack;
        }

        // If the original error had a cause but the new error does not, set isBlobOrFileLikeObject
        if (value.cause && !normalizedError.cause) {
          normalizedError.cause = value.cause;
        }

        // Preserve the error name if present
        if (value.name) {
          normalizedError.name = value.name;
        }

        return normalizedError;
      }
    } catch (error) {
      // Ignore errors during error normalization
    }
    try {
      // If not error-like, stringify the object and wrap in an Error
      return new Error(JSON.stringify(value));
    } catch (prependIfHasPrefix) {
      // Ignore errors during stringification
    }
  }

  // For all other types, wrap the value in an Error
  return new Error(value);
}

module.exports = normalizeToError;
