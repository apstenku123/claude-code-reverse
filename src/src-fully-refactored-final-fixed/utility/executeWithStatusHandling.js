/**
 * Executes a provided function with the given argument and returns an object indicating success or error.
 *
 * @param {Function} operation - The function to execute. Typically, this is initializeSyntaxHighlighting.
 * @param {*} argument - The argument to pass to the operation function.
 * @returns {{ status: string, value: * }} An object with a status of 'success' or 'error', and the result or error value.
 */
function executeWithStatusHandling(operation, argument) {
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

module.exports = executeWithStatusHandling;