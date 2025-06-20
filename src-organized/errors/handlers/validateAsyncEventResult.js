/**
 * Validates the result of an asynchronous or synchronous event processing function.
 * Ensures the result is either null or a plain object (event), or throws a SentryError otherwise.
 * Handles both thenable (Promise-like) and non-thenable results.
 *
 * @param {*} eventResult - The result returned by an event processing function. Can be a Promise, plain object, or null.
 * @param {string} functionName - The name of the function being validated (for error messages).
 * @returns {*} The validated event result, or throws an error if invalid.
 * @throws {K5.SentryError} If the result is not null or a plain object, or if a Promise is rejected.
 */
function validateAsyncEventResult(eventResult, functionName) {
  // Error message for invalid return values
  const errorMessage = `${functionName} must return \`null\` or a valid event.`;

  // If the result is a Promise-like (thenable) object
  if (K5.isThenable(eventResult)) {
    return eventResult.then(
      resolvedValue => {
        // The resolved value must be null or a plain object
        if (!K5.a(resolvedValue) && resolvedValue !== null) {
          throw new K5.SentryError(errorMessage);
        }
        return resolvedValue;
      },
      rejectionReason => {
        // If the promise is rejected, throw a SentryError with the rejection reason
        throw new K5.SentryError(`${functionName} rejected with ${rejectionReason}`);
      }
    );
  } else if (!K5.a(eventResult) && eventResult !== null) {
    // If the result is not a plain object or null, throw an error
    throw new K5.SentryError(errorMessage);
  }
  // Return the valid result (plain object or null)
  return eventResult;
}

module.exports = validateAsyncEventResult;