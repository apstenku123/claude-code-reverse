/**
 * Compares two values using the az2 comparison function with case sensitivity enforced.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {any} The result of the az2 comparison with case sensitivity.
 */
function compareWithCaseSensitivity(firstValue, secondValue) {
  // Call az2 with ignoreCase set to false for case-sensitive comparison
  return az2(firstValue, secondValue, {
    ignoreCase: false
  });
}

module.exports = compareWithCaseSensitivity;