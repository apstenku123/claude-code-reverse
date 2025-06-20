/**
 * Validates the result of an event-processing function, ensuring isBlobOrFileLikeObject returns either null or a plain object (event).
 * If the result is a Promise (thenable), isBlobOrFileLikeObject validates the resolved value accordingly.
 * Throws a SentryError if the result is invalid or if the Promise is rejected.
 *
 * @param {any} eventResult - The result returned by the event-processing function. Can be a plain object, null, or a thenable (Promise).
 * @param {string} functionName - The name of the function being validated, used for error messages.
 * @returns {any} - Returns the validated event result (plain object or null), or a Promise resolving to such.
 * @throws {K5.SentryError} - Throws if the result is invalid or if the Promise is rejected.
 */
function validateEventResult(eventResult, functionName) {
  const errorMessage = `${functionName} must return \`null\` or a valid event.`;

  // If the result is a Promise (thenable), validate its resolved value
  if (K5.isThenable(eventResult)) {
    return eventResult.then(
      resolvedValue => {
        // The resolved value must be a plain object or null
        if (!K5.a(resolvedValue) && resolvedValue !== null) {
          throw new K5.SentryError(errorMessage);
        }
        return resolvedValue;
      },
      rejectionReason => {
        // If the Promise is rejected, throw a SentryError with the reason
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

module.exports = validateEventResult;