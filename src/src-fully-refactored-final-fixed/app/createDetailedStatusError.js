/**
 * Creates a detailed Error object containing status information and custom stack trace.
 *
 * @param {Object} statusInfo - An object containing error code, details, and other properties.
 *   @property {string|number} code - The error/status code.
 *   @property {string} details - Additional details about the error.
 *   @property {...any} [otherProps] - Any other properties to be merged into the error.
 * @param {string} callSiteDescription - a string describing where the error occurred (e.g., a stack trace or function call site).
 * @returns {Error} An Error object with a detailed message, merged properties, and a custom stack trace.
 */
function createDetailedStatusError(statusInfo, callSiteDescription) {
  // Compose a human-readable error message using the code, status text, and details
  const errorMessage = `${statusInfo.code} ${Ks.Status[statusInfo.code]}: ${statusInfo.details}`;

  // Build a custom stack trace that includes the original error stack and the call site description
  const customStack = `${new Error(errorMessage).stack}
for call at
${callSiteDescription}`;

  // Create an Error object, merge in all properties from statusInfo, and override the stack trace
  return Object.assign(new Error(errorMessage), statusInfo, {
    stack: customStack
  });
}

module.exports = createDetailedStatusError;