/**
 * Custom error class that attaches a message and a locator object to the error instance.
 * Optionally captures the stack trace if supported by the environment.
 *
 * @class CustomErrorWithLocator
 * @extends Error
 * @param {string} errorMessage - The error message to be associated with this error.
 * @param {object} locator - An object providing additional context or location information for the error.
 */
function CustomErrorWithLocator(errorMessage, locator) {
  // Assign the error message to the instance
  this.message = errorMessage;
  // Attach the locator/context object to the instance
  this.locator = locator;

  // Capture the stack trace if the environment supports isBlobOrFileLikeObject
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, CustomErrorWithLocator);
  }
}

module.exports = CustomErrorWithLocator;