/**
 * Creates a function that applies a specified Math method (or Math.trunc by default) to a number,
 * returning 0 if the result is 0, or the processed integer otherwise.
 *
 * @param {string} [mathMethodName] - Optional. The name of the Math method to use (e.g., 'floor', 'ceil').
 *                                     If not provided, Math.trunc is used.
 * @returns {function(number): number} - a function that processes a number as described above.
 */
function createMathTruncator(mathMethodName) {
  return function(number) {
    // Determine which Math method to use: the one specified or Math.trunc by default
    const mathFunction = mathMethodName ? Math[mathMethodName] : Math.trunc;
    // Apply the Math function to the input number
    const processedInteger = mathFunction(number);
    // If the result is 0, return 0; otherwise, return the processed integer
    return processedInteger === 0 ? 0 : processedInteger;
  };
}

module.exports = createMathTruncator;