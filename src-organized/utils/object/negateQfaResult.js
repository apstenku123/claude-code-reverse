/**
 * Negates the result of the compareValues comparison function.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {number} The negated result of compareValues(firstValue, secondValue).
 */
function negateQfaResult(firstValue, secondValue) {
  // Call compareValues with the provided values and negate its result
  return -1 * compareValues(firstValue, secondValue);
}

module.exports = negateQfaResult;