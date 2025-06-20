/**
 * Validates the status of the provided result object and returns a standardized response.
 * If the result is valid, returns a success object with the value.
 * If invalid, throws an error if no issues are present, otherwise returns a failure object with a lazily-evaluated error.
 *
 * @param {Object} validationContext - The context object containing validation issues (typically from mapInteractionsToRoutes).
 * @param {Object} resultObject - The object to validate (typically from addActivityIfNotFinished).
 * @returns {Object} An object indicating success or failure, and containing data or error as appropriate.
 */
function validateStatusAndReturnResult(validationContext, resultObject) {
  // Check if the resultObject has a valid status
  if (isStatusValid(resultObject)) {
    return {
      success: true,
      data: resultObject.value
    };
  } else {
    // If there are no issues, throw an error as this is unexpected
    if (!validationContext.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    // Return a failure object with a lazily-evaluated error property
    return {
      success: false,
      get error() {
        // Cache the error object after first computation
        if (this._error) return this._error;
        // GF is assumed to be an Error or error-wrapper class that takes issues as input
        const errorInstance = new GF(validationContext.common.issues);
        this._error = errorInstance;
        return this._error;
      }
    };
  }
}

module.exports = validateStatusAndReturnResult;