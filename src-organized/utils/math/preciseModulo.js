/**
 * Calculates the floating-point modulo (remainder) of two numbers with precision handling for decimal places.
 * This function avoids floating-point precision errors by normalizing both numbers to integers based on the maximum number of decimal places.
 *
 * @param {number} dividend - The number to be divided (left operand).
 * @param {number} divisor - The number by which to divide (right operand).
 * @returns {number} The precise floating-point remainder after dividing dividend by divisor.
 */
function preciseModulo(dividend, divisor) {
  // Determine the number of decimal places in each operand
  const dividendDecimalPlaces = (dividend.toString().split(".")[1] || "").length;
  const divisorDecimalPlaces = (divisor.toString().split(".")[1] || "").length;

  // Use the maximum decimal places to normalize both numbers
  const maxDecimalPlaces = Math.max(dividendDecimalPlaces, divisorDecimalPlaces);

  // Convert both numbers to integers by shifting the decimal point
  const normalizedDividend = parseInt(dividend.toFixed(maxDecimalPlaces).replace(".", ""), 10);
  const normalizedDivisor = parseInt(divisor.toFixed(maxDecimalPlaces).replace(".", ""), 10);

  // Compute the modulo and scale back to the original decimal place
  const remainder = normalizedDividend % normalizedDivisor;
  return remainder / Math.pow(10, maxDecimalPlaces);
}

module.exports = preciseModulo;