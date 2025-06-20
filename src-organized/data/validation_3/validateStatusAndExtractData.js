/**
 * Validates the provided config object and extracts data if valid, otherwise returns error details.
 *
 * @param {Object} validationContext - The context object containing validation results and issues (originally 'a').
 * @param {Object} statusResult - The result object to check for validity and extract value from (originally 'createPropertyAccessor').
 * @returns {Object} An object indicating success and containing either the extracted data or an error accessor.
 */
function validateStatusAndExtractData(validationContext, statusResult) {
  // Check if the statusResult is valid using isStatusValid
  if (isStatusValid(statusResult)) {
    return {
      success: true,
      data: statusResult.value
    };
  } else {
    // If there are no issues, throw an error as this is unexpected
    if (!validationContext.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    // Return an object with a lazy error getter that caches the error instance
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        // GF is assumed to be an Error or custom error class that takes issues as argument
        const errorInstance = new GF(validationContext.common.issues);
        this._error = errorInstance;
        return this._error;
      }
    };
  }
}

module.exports = validateStatusAndExtractData;