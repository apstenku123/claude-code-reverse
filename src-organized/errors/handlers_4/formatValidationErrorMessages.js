/**
 * Formats and summarizes validation error messages from a validation result object.
 *
 * @param {string} actionName - The name of the action or function being validated (used in the error message prefix).
 * @param {Object} validationResult - The validation result object containing error details.
 * @param {Array} validationResult.errors - Array of error objects from the validation process.
 * @param {string} validationResult.message - The original validation error message.
 * @returns {string} a formatted error message summarizing all validation issues.
 */
function formatValidationErrorMessages(actionName, validationResult) {
  // Extract errors for missing required parameters
  const missingRequiredParams = validationResult.errors
    .filter(error =>
      error.code === "invalid_type" &&
      error.received === "undefined" &&
      error.message === "Required"
    )
    .map(error => String(error.path[0]));

  // Extract errors for unrecognized (unexpected) keys
  const unrecognizedKeys = validationResult.errors
    .filter(error => error.code === "unrecognized_keys")
    .flatMap(error => error.keys);

  // Extract errors for invalid types (excluding missing required params)
  const invalidTypeParams = validationResult.errors
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
  let formattedMessage = validationResult.message;
  const detailedMessages = [];

  // Add messages for missing required parameters
  if (missingRequiredParams.length > 0) {
    const messages = missingRequiredParams.map(param =>
      `The required parameter \`${param}\` is missing`
    );
    detailedMessages.push(...messages);
  }

  // Add messages for unrecognized keys
  if (unrecognizedKeys.length > 0) {
    const messages = unrecognizedKeys.map(key =>
      `An unexpected parameter \`${key}\` was provided`
    );
    detailedMessages.push(...messages);
  }

  // Add messages for invalid type parameters
  if (invalidTypeParams.length > 0) {
    const messages = invalidTypeParams.map(({ param, expected, received }) =>
      `The parameter \`${param}\` type is expected as \`${expected}\` but provided as \`${received}\``
    );
    detailedMessages.push(...messages);
  }

  // If there are any detailed messages, format the final message
  if (detailedMessages.length > 0) {
    formattedMessage = `${actionName} failed due to the following ${detailedMessages.length > 1 ? "issues" : "issue"}:
${detailedMessages.join("\n")}`;
  }

  return formattedMessage;
}

module.exports = formatValidationErrorMessages;