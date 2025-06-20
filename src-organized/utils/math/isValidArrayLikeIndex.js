/**
 * Checks if the provided value is a valid array-like index.
 *
 * @param {any} value - The value to check as an index.
 * @param {number} [maxLength] - The upper bound (exclusive) for the index. Defaults to M1 if not provided.
 * @returns {boolean} True if value is a valid array-like index, false otherwise.
 */
function isValidArrayLikeIndex(value, maxLength) {
  // Determine the type of the value
  const valueType = typeof value;

  // Use default max length if not provided
  const effectiveMaxLength = maxLength == null ? M1 : maxLength;

  // Check that maxLength is truthy (not 0, null, undefined, etc.)
  // and that value is a non-negative integer less than maxLength
  // - valueType is 'number', or
  // - valueType is not 'symbol' and value matches the aZ regex (likely for string numbers)
  // - value > -1 (non-negative)
  // - value is an integer (value % 1 === 0)
  // - value < effectiveMaxLength
  return !!effectiveMaxLength &&
    (
      valueType === "number" ||
      (valueType !== "symbol" && aZ.test(value))
    ) &&
    value > -1 &&
    value % 1 === 0 &&
    value < effectiveMaxLength;
}

module.exports = isValidArrayLikeIndex;