/**
 * Creates a function that normalizes a given value to a specific integer range, based on bit length and configuration options.
 *
 * @param {number} bitLength - The bit length to determine the integer range (e.g., 8 for Int8/Uint8).
 * @param {Object} options - Configuration options for normalization.
 * @param {boolean} [options.unsigned=false] - If true, treats the range as unsigned (e.g., Uint8).
 * @param {number} [options.moduloBitLength] - Optional bit length for modulo operation (overrides bitLength for modulo calculations).
 * @returns {function(number, Object=): number} - a function that normalizes a value according to the specified range and options.
 *
 * The returned function accepts:
 *   - value: The number to normalize.
 *   - normalizationOptions: Optional object with:
 *       - enforceRange: If true, throws if value is out of range.
 *       - clamp: If true, clamps value to the range.
 */
function createIntegerRangeNormalizer(bitLength, options) {
  // If unsigned is false, decrease bitLength by 1 to account for sign bit
  if (!options.unsigned) {
    --bitLength;
  }

  // Calculate minimum allowed value (for signed types)
  const minValue = options.unsigned ? 0 : -Math.pow(2, bitLength);

  // Calculate maximum allowed value
  const maxValue = Math.pow(2, bitLength) - 1;

  // Calculate modulo base (for wrapping values)
  const moduloBase = options.moduloBitLength
    ? Math.pow(2, options.moduloBitLength)
    : Math.pow(2, bitLength);

  // Calculate threshold for signed overflow
  const signedOverflowThreshold = options.moduloBitLength
    ? Math.pow(2, options.moduloBitLength - 1)
    : Math.pow(2, bitLength - 1);

  /**
   * Normalizes a value to the configured integer range.
   *
   * @param {number} value - The value to normalize.
   * @param {Object} [normalizationOptions] - Optional normalization options.
   * @param {boolean} [normalizationOptions.enforceRange] - If true, throws if value is out of range.
   * @param {boolean} [normalizationOptions.clamp] - If true, clamps value to the range.
   * @returns {number} - The normalized value.
   */
  return function normalizeValue(value, normalizationOptions) {
    if (!normalizationOptions) normalizationOptions = {};
    let numericValue = +value;

    // Enforce range: throw if value is not finite or out of range
    if (normalizationOptions.enforceRange) {
      if (!Number.isFinite(numericValue)) {
        throw new TypeError("Argument is not a finite number");
      }
      // getSignOfNumber and roundOrFloorSpecialCase are assumed to be external normalization helpers
      numericValue = getSignOfNumber(numericValue) * Math.floor(Math.abs(numericValue));
      if (numericValue < minValue || numericValue > maxValue) {
        throw new TypeError("Argument is not in byte range");
      }
      return numericValue;
    }

    // Clamp: restrict value to the allowed range
    if (!isNaN(numericValue) && normalizationOptions.clamp) {
      numericValue = roundOrFloorSpecialCase(numericValue);
      if (numericValue < minValue) numericValue = minValue;
      if (numericValue > maxValue) numericValue = maxValue;
      return numericValue;
    }

    // If value is not finite or is zero, return 0
    if (!Number.isFinite(numericValue) || numericValue === 0) {
      return 0;
    }

    // Normalize value: sign, absolute, modulo
    numericValue = getSignOfNumber(numericValue) * Math.floor(Math.abs(numericValue));
    numericValue = numericValue % moduloBase;

    // Handle signed overflow
    if (!options.unsigned && numericValue >= signedOverflowThreshold) {
      return numericValue - moduloBase;
    } else if (options.unsigned) {
      // For unsigned, wrap negative values
      if (numericValue < 0) {
        numericValue += moduloBase;
      } else if (Object.is(numericValue, -0)) {
        // Special case: negative zero
        return 0;
      }
    }
    return numericValue;
  };
}

module.exports = createIntegerRangeNormalizer;