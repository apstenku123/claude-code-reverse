/**
 * Calculates the modulo (remainder) of two decimal numbers with floating-point precision handling.
 * This function ensures correct results for decimal numbers by normalizing both operands to integers
 * based on the maximum number of decimal places, then performing the modulo operation and scaling back.
 *
 * @param {number} dividend - The number to be divided (the numerator).
 * @param {number} divisor - The number by which to divide (the denominator).
 * @returns {number} The floating-point remainder after dividing dividend by divisor.
 */
function decimalModulo(dividend, divisor) {
  // Determine the number of decimal places in each operand
  const dividendDecimalPlaces = (dividend.toString().split(".")[1] || "").length;
  const divisorDecimalPlaces = (divisor.toString().split(".")[1] || "").length;

  // Use the maximum decimal places to normalize both numbers
  const maxDecimalPlaces = Math.max(dividendDecimalPlaces, divisorDecimalPlaces);

  // Convert both numbers to integers by shifting the decimal point
  const normalizedDividend = parseInt(dividend.toFixed(maxDecimalPlaces).replace(".", ""), 10);
  const normalizedDivisor = parseInt(divisor.toFixed(maxDecimalPlaces).replace(".", ""), 10);

  // Perform integer modulo, then scale back to the original decimal place
  const remainder = normalizedDividend % normalizedDivisor;
  return remainder / Math.pow(10, maxDecimalPlaces);
}

module.exports = decimalModulo;