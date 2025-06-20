/**
 * Checks if the provided value is a valid array-like index (non-negative integer less than the given length).
 *
 * @param {any} value - The value to check as an array index.
 * @param {number} [length=DEFAULT_MAX_LENGTH] - The upper bound (exclusive) for a valid index. Defaults to DEFAULT_MAX_LENGTH if not provided.
 * @returns {boolean} True if value is a valid array index, false otherwise.
 */
function isValidArrayIndex(value, length) {
  // Use typeof to determine the type of the value
  const valueType = typeof value;
  // Use default max length if length is null or undefined
  const maxLength = length == null ? DEFAULT_MAX_LENGTH : length;
  // Check if maxLength is truthy, value is a number or a string matching the array index regex,
  // value is a non-negative integer, and less than maxLength
  return !!maxLength &&
    (valueType === "number" || (valueType !== "symbol" && ARRAY_INDEX_REGEX.test(value))) &&
    value > -1 &&
    value % 1 === 0 &&
    value < maxLength;
}

// Example dependencies (should be defined elsewhere in your codebase)
const DEFAULT_MAX_LENGTH = M1; // M1 should be defined as the default maximum length
const ARRAY_INDEX_REGEX = aZ; // aZ should be a RegExp matching valid array indices

module.exports = isValidArrayIndex;