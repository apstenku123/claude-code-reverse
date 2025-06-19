/**
 * Executes a provided function with the given argument and returns an object indicating success or error.
 *
 * @param {Function} operation - The function to execute. For example, initializeSyntaxHighlighting.
 * @param {*} argument - The argument to pass to the operation function.
 * @returns {{ status: string, value: * }} An object with a 'status' property ('success' or 'error') and the result or error.
 */
function executeWithStatus(operation, argument) {
  const result = {};
  try {
    // Attempt to execute the operation with the provided argument
    result.value = operation(argument);
    result.status = "success";
  } catch (error) {
    // If an error occurs, capture the error and set status to 'error'
    result.status = "error";
    result.value = error;
  }
  return result;
}

module.exports = executeWithStatus;