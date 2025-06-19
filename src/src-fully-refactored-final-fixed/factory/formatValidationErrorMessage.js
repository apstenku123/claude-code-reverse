/**
 * Formats a detailed validation error message based on the provided error object.
 *
 * @param {string} actionName - The name of the action or process that failed validation.
 * @param {Object} validationError - The error object containing validation errors (typically from a schema validator).
 * @param {Array} validationError.errors - Array of error objects with details about each validation issue.
 * @param {string} validationError.message - The original error message.
 * @returns {string} a formatted error message describing all validation issues.
 */
function formatValidationErrorMessage(actionName, validationError) {
  // Find all missing required parameters
  const missingRequiredParams = validationError.errors
    .filter(error =>
      error.code === "invalid_type" &&
      error.received === "undefined" &&
      error.message === "Required"
    )
    .map(error => String(error.path[0]));

  // Find all unrecognized (unexpected) keys
  const unrecognizedKeys = validationError.errors
    .filter(error => error.code === "unrecognized_keys")
    .flatMap(error => error.keys);

  // Find all type mismatch errors that are not missing required params
  const typeMismatchParams = validationError.errors
    .filter(error =>
      error.code === "invalid_type" &&
      "received" in error &&
      error.received !== "undefined" &&
      error.message !== "Required"
    )
    .map(error => ({
      param: String(error.path[0]),
      expected: error.expected,
      received: error.received
    }));

  // Start with the original message
  let formattedMessage = validationError.message;
  const issues = [];

  // Add messages for missing required parameters
  if (missingRequiredParams.length > 0) {
    const messages = missingRequiredParams.map(param => `The required parameter \`${param}\` is missing`);
    issues.push(...messages);
  }

  // Add messages for unrecognized keys
  if (unrecognizedKeys.length > 0) {
    const messages = unrecognizedKeys.map(key => `An unexpected parameter \`${key}\` was provided`);
    issues.push(...messages);
  }

  // Add messages for type mismatches
  if (typeMismatchParams.length > 0) {
    const messages = typeMismatchParams.map(({ param, expected, received }) =>
      `The parameter \`${param}\` type is expected as \`${expected}\` but provided as \`${received}\``
    );
    issues.push(...messages);
  }

  // If there are any issues, format the final message
  if (issues.length > 0) {
    formattedMessage = `${actionName} failed due to the following ${issues.length > 1 ? "issues" : "issue"}:
${issues.join("\n")}`;
  }

  return formattedMessage;
}

module.exports = formatValidationErrorMessage;