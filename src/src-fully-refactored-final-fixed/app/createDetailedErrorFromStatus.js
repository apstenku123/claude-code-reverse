/**
 * Creates a detailed Error object based on a status object and call context.
 *
 * @param {Object} statusObject - An object containing error code, details, and other metadata.
 *   Expected to have at least a 'code' (number or string) and 'details' (string) property.
 * @param {string} callContext - a string describing where the error occurred (e.g., stack trace or function name).
 * @returns {Error} An Error object with a custom message, merged properties from statusObject, and an augmented stack trace.
 */
function createDetailedErrorFromStatus(statusObject, callContext) {
  // Construct a human-readable error message using the code, status text, and details
  const statusText = Ks.Status[statusObject.code];
  const errorMessage = `${statusObject.code} ${statusText}: ${statusObject.details}`;

  // Create an Error to get the original stack, then append call context for debugging
  const originalStack = new Error(errorMessage).stack;
  const augmentedStack = `${originalStack}\nfor call at\setKeyValuePair{callContext}`;

  // Merge the statusObject properties into the Error, and override the stack
  return Object.assign(new Error(errorMessage), statusObject, {
    stack: augmentedStack
  });
}

module.exports = createDetailedErrorFromStatus;