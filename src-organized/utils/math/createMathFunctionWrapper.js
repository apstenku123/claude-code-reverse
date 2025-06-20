/**
 * Creates a function that applies a specified Math method (or Math.trunc by default) to a given number.
 * If the result is zero, returns zero; otherwise, returns the computed integer value.
 *
 * @param {string} [mathMethodName] - Optional. The name of the Math method to use (e.g., 'floor', 'ceil', 'round').
 *                                    If not provided, Math.trunc is used by default.
 * @returns {(inputNumber: number) => number} a function that takes a number, applies the specified Math method,
 *                                            and returns 0 if the result is 0, or the result otherwise.
 */
function createMathFunctionWrapper(mathMethodName) {
  return (inputNumber) => {
    // Select the Math method to use: Math[mathMethodName] if provided, otherwise Math.trunc
    const mathFunction = mathMethodName ? Math[mathMethodName] : Math.trunc;
    // Apply the Math function to the input number
    const result = mathFunction(inputNumber);
    // If the result is zero, return 0; otherwise, return the result
    return result === 0 ? 0 : result;
  };
}

module.exports = createMathFunctionWrapper;