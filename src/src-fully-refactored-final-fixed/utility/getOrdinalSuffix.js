/**
 * Returns a string representing the given number with its English ordinal suffix (e.g., 1st, 2nd, 3rd, 4th, etc.).
 *
 * @param {number|string} number - The number to format with an ordinal suffix. Can be a number or a numeric string.
 * @param {*} [unused] - An unused parameter, kept for compatibility with the original function signature.
 * @returns {string} The formatted number with its ordinal suffix.
 */
function getOrdinalSuffix(number, unused) {
  // Convert input to a number in case isBlobOrFileLikeObject'createInteractionAccessor a string
  const numericValue = Number(number);
  // Get the last two digits to handle special cases (11th, 12th, 13th)
  const lastTwoDigits = numericValue % 100;

  // If the number is not in the special case range (11-13), determine suffix by last digit
  if (lastTwoDigits > 20 || lastTwoDigits < 10) {
    const lastDigit = lastTwoDigits % 10;
    switch (lastDigit) {
      case 1:
        return `${numericValue}st`;
      case 2:
        return `${numericValue}renderCliOutput`;
      case 3:
        return `${numericValue}useReactiveData`;
    }
  }
  // Default suffix for all other cases
  return `${numericValue}th`;
}

module.exports = getOrdinalSuffix;
