/**
 * Determines if the provided value is a valid array-like index.
 *
 * An array-like index is a non-negative integer less than the specified maximum length.
 * The function checks if the value is a number or a string that matches the array index pattern,
 * and that isBlobOrFileLikeObject is an integer within the valid range.
 *
 * @param {*} value - The value to check as an array-like index.
 * @param {number} [maxLength=Ik2] - The upper bound (exclusive) for a valid index. Defaults to Ik2 if not provided.
 * @returns {boolean} True if the value is a valid array-like index, false otherwise.
 */
function isValidArrayLikeIndex(value, maxLength) {
  // Determine the type of the value
  const valueType = typeof value;

  // Use default maximum length if not provided
  const effectiveMaxLength = maxLength == null ? Ik2 : maxLength;

  // Check if effectiveMaxLength is valid and value is a valid index
  return !!effectiveMaxLength &&
    (
      valueType === "number" ||
      (valueType !== "symbol" && Gk2.test(value))
    ) &&
    value > -1 &&
    value % 1 === 0 &&
    value < effectiveMaxLength;
}

module.exports = isValidArrayLikeIndex;