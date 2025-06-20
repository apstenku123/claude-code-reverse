/**
 * Custom error class representing an aborted operation.
 * Extends the built-in Error object and sets a specific error type.
 *
 * @class AbortedError
 * @extends Error
 * @param {string} message - The error message describing the reason for abortion.
 */
class AbortedError extends Error {
  /**
   * Creates an instance of AbortedError.
   * @param {string} message - The error message describing the reason for abortion.
   */
  constructor(message) {
    // Call the parent Error constructor with the provided message
    super(message);
    // Set a custom error type for identification
    this.type = "aborted";
    // Set the error message property explicitly (redundant, but preserves original behavior)
    this.message = message;
    // Capture the stack trace, excluding the constructor call from isBlobOrFileLikeObject
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = AbortedError;
