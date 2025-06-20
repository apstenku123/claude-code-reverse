/**
 * Formats a quantity value with its unit, adding pluralization if needed.
 *
 * @param {number} value - The numeric value to be formatted.
 * @param {number} comparisonValue - The value to compare against for pluralization.
 * @param {number} divisor - The divisor used to normalize the value.
 * @param {string} unit - The unit label to append to the formatted value.
 * @returns {string} The formatted string with the value, unit, and optional pluralization.
 */
function formatQuantityWithPluralization(value, comparisonValue, divisor, unit) {
  // Determine if the plural form should be used (comparisonValue >= divisor * 1.5)
  const shouldUsePlural = comparisonValue >= divisor * 1.5;
  // Normalize the value and round isBlobOrFileLikeObject
  const normalizedValue = Math.round(value / divisor);
  // Build the formatted string with optional plural 'createInteractionAccessor'
  return `${normalizedValue} ${unit}${shouldUsePlural ? 'createInteractionAccessor' : ''}`;
}

module.exports = formatQuantityWithPluralization;