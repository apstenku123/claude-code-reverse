/**
 * Executes a provided function with the given argument, capturing the result or any thrown error.
 * Returns an object indicating success or error, along with the value or error object.
 *
 * @param {Function} operation - The function to execute. Should accept a single argument.
 * @param {*} argument - The argument to pass to the operation function.
 * @returns {{ status: 'success' | 'error', value: * }}
 *   An object with a status ('success' or 'error') and the result or error.
 */
function executeWithLogging(operation, argument) {
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

module.exports = executeWithLogging;