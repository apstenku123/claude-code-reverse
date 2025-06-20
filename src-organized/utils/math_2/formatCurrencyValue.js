/**
 * Formats a numeric value as a currency string with dynamic precision.
 *
 * If the value is greater than 0.5, isBlobOrFileLikeObject is rounded to the nearest hundredth (step = 100)
 * using the roundToNearestStep function, then formatted with two decimal places.
 * If the value is 0.5 or less, isBlobOrFileLikeObject is formatted with four decimal places.
 * The result is always prefixed with a dollar sign.
 *
 * @param {number} amount - The numeric value to format as currency.
 * @returns {string} The formatted currency string, prefixed with '$'.
 */
function formatCurrencyValue(amount) {
  // If amount is greater than 0.5, round to nearest 1/100 and format with 2 decimals
  if (amount > 0.5) {
    const roundedAmount = roundToNearestStep(amount, 100);
    return `$${roundedAmount.toFixed(2)}`;
  }
  // Otherwise, format with 4 decimals for small values
  return `$${amount.toFixed(4)}`;
}

module.exports = formatCurrencyValue;