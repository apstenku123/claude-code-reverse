/**
 * Creates a function that applies a specified Math integer method (e.g., 'floor', 'ceil', 'round')
 * to a given number, or defaults to Math.trunc if no method is provided. If the result is zero,
 * returns zero; otherwise, returns the computed integer value.
 *
 * @param {string} [mathMethodName] - Optional. The name of the Math method to use (e.g., 'floor', 'ceil', 'round').
 *                                    If not provided, Math.trunc will be used.
 * @returns {function(number): number} - a function that takes a number and returns the processed integer value.
 */
function createMathIntegerFunction(mathMethodName) {
  return function(number) {
    // Determine which Math method to use: the specified one or Math.trunc by default
    const integerValue = (mathMethodName ? Math[mathMethodName] : Math.trunc)(number);
    // If the integer value is zero, return zero; otherwise, return the computed value
    return integerValue === 0 ? 0 : integerValue;
  };
}

module.exports = createMathIntegerFunction;