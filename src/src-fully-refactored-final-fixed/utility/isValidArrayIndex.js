/**
 * Checks if the provided value is a valid array-like index.
 *
 * a valid array index is:
 *   - a non-negative integer
 *   - less than the specified maximum length
 *   - either a number or a string that matches the array index pattern
 *
 * @param {*} value - The value to check as an array index.
 * @param {number} [maxLength=Ik2] - The upper bound (exclusive) for a valid index. Defaults to Ik2 if not provided.
 * @returns {boolean} True if the value is a valid array index, false otherwise.
 */
function isValidArrayIndex(value, maxLength) {
  // Determine the type of the value
  const valueType = typeof value;

  // Use default maxLength if not provided
  const lengthLimit = maxLength == null ? Ik2 : maxLength;

  // Check if:
  // - lengthLimit is truthy
  // - value is a number OR (not a symbol and matches array index pattern)
  // - value is a non-negative integer less than lengthLimit
  return !!lengthLimit &&
    (valueType === "number" || (valueType !== "symbol" && Gk2.test(value))) &&
    value > -1 &&
    value % 1 === 0 &&
    value < lengthLimit;
}

module.exports = isValidArrayIndex;