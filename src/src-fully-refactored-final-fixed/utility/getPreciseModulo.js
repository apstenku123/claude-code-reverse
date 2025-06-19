/**
 * Calculates the modulo (remainder) of two numbers with improved precision for floating-point values.
 * This function avoids floating-point errors by scaling both numbers to integers based on the maximum number of decimal places.
 *
 * @param {number} dividend - The number to be divided (the numerator).
 * @param {number} divisor - The number by which to divide (the denominator).
 * @returns {number} The precise floating-point remainder of dividend divided by divisor.
 */
function getPreciseModulo(dividend, divisor) {
  // Convert numbers to strings and determine the number of decimal places for each
  const dividendDecimalPlaces = (dividend.toString().split(".")[1] || "").length;
  const divisorDecimalPlaces = (divisor.toString().split(".")[1] || "").length;

  // Use the maximum decimal places to scale both numbers to integers
  const maxDecimalPlaces = Math.max(dividendDecimalPlaces, divisorDecimalPlaces);

  // Scale both numbers to integers by shifting the decimal point
  const scaledDividend = parseInt(dividend.toFixed(maxDecimalPlaces).replace(".", ""), 10);
  const scaledDivisor = parseInt(divisor.toFixed(maxDecimalPlaces).replace(".", ""), 10);

  // Calculate the modulo of the scaled integers, then scale back to the original decimal place
  const scaledRemainder = scaledDividend % scaledDivisor;
  const preciseRemainder = scaledRemainder / Math.pow(10, maxDecimalPlaces);

  return preciseRemainder;
}

module.exports = getPreciseModulo;