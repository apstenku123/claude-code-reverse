/**
 * Formats a number into a compact, human-readable string (e.g., 1.2k for 1200).
 * Uses the 'en' locale and adjusts decimal places based on the number'createInteractionAccessor size.
 *
 * @param {number} value - The number to format.
 * @returns {string} The formatted, compact, lowercase string representation of the number.
 */
function formatNumberCompact(value) {
  // Determine if the number is 1000 or greater to decide on decimal places
  const isThousandOrGreater = value >= 1000;

  // Configure the number formatter for compact notation
  const numberFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: isThousandOrGreater ? 1 : 0,
    maximumFractionDigits: 1
  });

  // Format the number and convert the result to lowercase
  return numberFormatter.format(value).toLowerCase();
}

module.exports = formatNumberCompact;