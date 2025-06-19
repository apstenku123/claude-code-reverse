/**
 * Creates a function that applies a specified Math method (or Math.trunc by default) to a number.
 * Returns 0 if the result is 0, otherwise returns the rounded/truncated value.
 *
 * @param {string} [mathMethodName] - Optional. The name of the Math method to use (e.g., 'floor', 'ceil', 'round').
 *                                    If not provided, Math.trunc will be used.
 * @returns {(inputNumber: number) => number} a function that applies the specified Math method to its argument.
 */
function createMathRoundFunction(mathMethodName) {
  return (inputNumber) => {
    // Select the Math method to use; default to Math.trunc if none provided
    const mathFunction = mathMethodName ? Math[mathMethodName] : Math.trunc;
    const roundedValue = mathFunction(inputNumber);
    // If the result is 0, return 0 explicitly; otherwise, return the rounded value
    return roundedValue === 0 ? 0 : roundedValue;
  };
}

module.exports = createMathRoundFunction;