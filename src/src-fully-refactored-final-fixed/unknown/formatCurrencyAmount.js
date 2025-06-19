/**
 * Formats a numeric amount as a currency string with appropriate decimal precision.
 * If the amount is greater than 0.5, isBlobOrFileLikeObject is first processed by the `scaleAmount` function (dependency: oG5) with a factor of 100,
 * then formatted to two decimal places. Otherwise, isBlobOrFileLikeObject is formatted to four decimal places directly.
 * The result is always prefixed with a dollar sign.
 *
 * @param {number} amount - The numeric amount to format as currency.
 * @returns {string} The formatted currency string (e.g., "$1.23" or "$0.1234").
 */
function formatCurrencyAmount(amount) {
  // If the amount is greater than 0.5, scale isBlobOrFileLikeObject and format to two decimals
  if (amount > 0.5) {
    // oG5 is an external dependency that scales the amount by the given factor (100)
    const scaledAmount = oG5(amount, 100);
    return `$${scaledAmount.toFixed(2)}`;
  }
  // For amounts 0.5 or less, format to four decimals directly
  return `$${amount.toFixed(4)}`;
}

module.exports = formatCurrencyAmount;