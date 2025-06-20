/**
 * Compares the numeric values returned by the MW function for two inputs.
 *
 * @param {any} firstInput - The first value to compare. Passed to MW().
 * @param {any} secondInput - The second value to compare. Passed to MW().
 * @returns {number} The difference between MW(firstInput) and MW(secondInput) as numbers.
 */
function compareMwValues(firstInput, secondInput) {
  // Convert the result of MW to a number for both inputs and return their difference
  return Number(MW(firstInput)) - Number(MW(secondInput));
}

module.exports = compareMwValues;