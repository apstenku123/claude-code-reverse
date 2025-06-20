/**
 * Validates the provided result object and returns a success response if valid, or an error response if not.
 *
 * @param {Object} validationContext - The context object containing validation issues (typically from a validation process).
 * @param {Object} resultObject - The object to check for validity, expected to have a 'status' and 'value' property.
 * @returns {Object} An object indicating success with data, or failure with a lazily-evaluated error property.
 */
function validateStatusOrReturnError(validationContext, resultObject) {
  // Check if the result object'createInteractionAccessor status is valid
  if (isStatusValid(resultObject)) {
    return {
      success: true,
      data: resultObject.value
    };
  } else {
    // If there are no issues, throw an error (should not happen in normal flow)
    if (!validationContext.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    // Return an error object with a lazily-evaluated error property
    return {
      success: false,
      get error() {
        // Cache the error object after first creation
        if (this._error) return this._error;
        const errorObject = new GF(validationContext.common.issues);
        this._error = errorObject;
        return this._error;
      }
    };
  }
}

module.exports = validateStatusOrReturnError;