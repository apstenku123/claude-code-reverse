/**
 * Compares two values by their string representations.
 *
 * Converts both input values to strings using their toString() methods,
 * then compares them lexicographically. Returns 1 if the first value is greater,
 * -1 if the second value is greater, or 0 if they are equal.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {number} 1 if firstValue > secondValue, -1 if firstValue < secondValue, 0 if equal.
 */
function compareValuesAsStrings(firstValue, secondValue) {
  // Convert both values to their string representations
  const firstString = firstValue.toString();
  const secondString = secondValue.toString();

  // Compare the string representations lexicographically
  if (firstString > secondString) {
    return 1;
  } else if (secondString > firstString) {
    return -1;
  } else {
    return 0;
  }
}

module.exports = compareValuesAsStrings;