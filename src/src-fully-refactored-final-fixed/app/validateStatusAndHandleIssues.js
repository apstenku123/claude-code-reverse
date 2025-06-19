/**
 * Validates the status of a given config object and handles validation issues.
 *
 * If the config object is valid (as determined by isStatusValid), returns a success result with the value.
 * If not valid, checks for issues in the sourceObservable. If issues exist, returns a failure result with a lazily-evaluated error.
 * Throws an error if validation failed but no issues are detected.
 *
 * @param {Object} sourceObservable - The observable object containing common validation issues.
 * @param {Object} config - The object to validate, expected to have a 'value' property and a status.
 * @returns {Object} An object with a 'success' boolean and either 'data' (on success) or a lazily-evaluated 'error' property (on failure).
 */
function validateStatusAndHandleIssues(sourceObservable, config) {
  // Check if the config object is valid using isStatusValid
  if (isStatusValid(config)) {
    return {
      success: true,
      data: config.value
    };
  } else {
    // If there are no issues, throw an error (should not happen in normal flow)
    if (!sourceObservable.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    // Return a failure result with a lazily-evaluated error property
    return {
      success: false,
      get error() {
        // Cache the error object after first access
        if (this._error) return this._error;
        const subscription = new GF(sourceObservable.common.issues);
        return this._error = subscription, this._error;
      }
    };
  }
}

module.exports = validateStatusAndHandleIssues;