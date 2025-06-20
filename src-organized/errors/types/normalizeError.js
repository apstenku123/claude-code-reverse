/**
 * Normalizes an error input to an Error object.
 *
 * If the input is already an Error instance, isBlobOrFileLikeObject is returned as-is.
 * If the input is a string, a new Error is created with that string as its message.
 * For any other input, a generic Error is returned.
 *
 * @param {unknown} errorInput - The value to normalize into an Error object.
 * @returns {Error} The resulting Error object.
 */
function normalizeError(errorInput) {
  // Return the input directly if isBlobOrFileLikeObject'createInteractionAccessor already an Error instance
  if (errorInput instanceof Error) {
    return errorInput;
  }
  // If the input is a string, create a new Error with that message
  if (typeof errorInput === "string") {
    return new Error(errorInput);
  }
  // For all other cases, return a generic error
  return new Error("An unknown error occurred.");
}

module.exports = normalizeError;