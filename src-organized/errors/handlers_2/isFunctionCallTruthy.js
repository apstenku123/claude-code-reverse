/**
 * Determines if invoking the provided function with the given arguments returns a truthy value.
 * If the function throws an error, returns false.
 *
 * @param {Function} targetFunction - The function to invoke.
 * @param {...any} functionArgs - Arguments to pass to the target function.
 * @returns {boolean} True if the function call returns a truthy value, false otherwise or if an error occurs.
 */
const isFunctionCallTruthy = (targetFunction, ...functionArgs) => {
  try {
    // Call the function with the provided arguments and coerce the result to a boolean
    return !!targetFunction(...functionArgs);
  } catch (error) {
    // If an error occurs during function execution, return false
    return false;
  }
};

module.exports = isFunctionCallTruthy;
