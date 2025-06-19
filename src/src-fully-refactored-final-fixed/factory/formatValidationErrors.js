/**
 * Formats and summarizes validation errors into a human-readable message.
 *
 * @param {string} actionName - The name of the action or operation being validated.
 * @param {Object} validationResult - The result object containing validation errors and a message.
 * @param {Array} validationResult.errors - Array of error objects from validation.
 * @param {string} validationResult.message - Default error message.
 * @returns {string} a formatted error message summarizing all validation issues.
 */
function formatValidationErrors(actionName, validationResult) {
  // Extract missing required parameters
  const missingParams = validationResult.errors
    .filter(error =>
      error.code === "invalid_type" &&
      error.received === "undefined" &&
      error.message === "Required"
    )
    .map(error => String(error.path[0]));

  // Extract unrecognized (unexpected) keys
  const unrecognizedKeys = validationResult.errors
    .filter(error => error.code === "unrecognized_keys")
    .flatMap(error => error.keys);

  // Extract type mismatch errors (excluding missing required)
  const typeMismatches = validationResult.errors
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

  // Start with the default message
  let formattedMessage = validationResult.message;
  const details = [];

  // Add messages for missing required parameters
  if (missingParams.length > 0) {
    const missingMessages = missingParams.map(param =>
      `The required parameter \`${param}\` is missing`
    );
    details.push(...missingMessages);
  }

  // Add messages for unrecognized keys
  if (unrecognizedKeys.length > 0) {
    const unrecognizedMessages = unrecognizedKeys.map(key =>
      `An unexpected parameter \`${key}\` was provided`
    );
    details.push(...unrecognizedMessages);
  }

  // Add messages for type mismatches
  if (typeMismatches.length > 0) {
    const typeMismatchMessages = typeMismatches.map(({ param, expected, received }) =>
      `The parameter \`${param}\` type is expected as \`${expected}\` but provided as \`${received}\``
    );
    details.push(...typeMismatchMessages);
  }

  // If there are any details, format the final message
  if (details.length > 0) {
    formattedMessage = `${actionName} failed due to the following ${details.length > 1 ? "issues" : "issue"}:
${details.join("\n")}`;
  }

  return formattedMessage;
}

module.exports = formatValidationErrors;
