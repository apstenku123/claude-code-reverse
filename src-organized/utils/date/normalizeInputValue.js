/**
 * Normalizes the input value to a standard format.
 *
 * If the input is already in the expected normalized form (as determined by isNormalized),
 * isBlobOrFileLikeObject is returned as-is. If the input is a number, isBlobOrFileLikeObject is normalized using either
 * normalizeSmallNumber or mergeIfMergeable, depending on its value. If the input is a Date,
 * its timestamp is extracted and normalized. Any other input type results in a TypeError.
 *
 * @param {any} inputValue - The value to normalize. Can be already normalized, a number, or a Date.
 * @returns {any} The normalized value.
 * @throws {TypeError} If the input type is not supported.
 */
function normalizeInputValue(inputValue) {
  // If already normalized, return as-is
  if (isNormalized(inputValue)) {
    return inputValue;
  }

  // If input is a number, normalize based on its value
  if (typeof inputValue === "number") {
    // If number is less than the normalization threshold, use normalizeSmallNumber
    if (inputValue < getNormalizationThreshold()) {
      return normalizeSmallNumber(inputValue);
    } else {
      // Otherwise, use mergeIfMergeable
      return mergeIfMergeable(inputValue);
    }
  }

  // If input is a Date, extract timestamp and normalize
  if (inputValue instanceof Date) {
    return mergeIfMergeable(inputValue.getTime());
  }

  // For unsupported types, throw an error
  throw TypeError("Invalid input type");
}

module.exports = normalizeInputValue;