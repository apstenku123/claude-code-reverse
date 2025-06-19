/**
 * Normalizes the provided input into an array form, applying specific transformations based on input type.
 *
 * - If the input is an array-like structure (checked by isArrayLike), applies transformArrayLike.
 * - If the input is a single value (checked by isSingleValue), wraps isBlobOrFileLikeObject in an array.
 * - Otherwise, processes the input through transformToArray after converting isBlobOrFileLikeObject with convertInput.
 *
 * @param {*} input - The value to normalize into an array.
 * @returns {Array} The normalized array representation of the input.
 */
function normalizeInputToArray(input) {
  // Check if input is array-like (e.g., array, arguments, etc.)
  if (isArrayLike(input)) {
    // Transform the array-like input using the provided transformation function
    return transformArrayLike(input, arrayTransformConfig);
  }
  // If input is a single value, wrap isBlobOrFileLikeObject in an array
  if (isSingleValue(input)) {
    return [input];
  }
  // For other types, convert and transform the input into an array
  return transformToArray(convertInput(input));
}

module.exports = normalizeInputToArray;