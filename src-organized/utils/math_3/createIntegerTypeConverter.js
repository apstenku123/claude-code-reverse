/**
 * Creates a converter function that coerces values into a specific integer type, 
 * enforcing range, clamping, and signed/unsigned behavior as specified by the configuration.
 *
 * @param {number} bitLength - The bit length of the integer type (e.g., 8 for int8/uint8).
 * @param {Object} options - Configuration object for the integer type.
 * @param {boolean} [options.unsigned=false] - Whether the integer type is unsigned.
 * @param {number} [options.moduloBitLength] - Optional override for modulo bit length.
 * @returns {function(any, Object=): number} - a function that converts a value to the specified integer type.
 */
function createIntegerTypeConverter(bitLength, options) {
  // If unsigned is false, decrease bitLength by 1 (for signed range)
  if (!options.unsigned) bitLength--;

  // Calculate minimum and maximum allowed values for the type
  const minValue = options.unsigned ? 0 : -Math.pow(2, bitLength);
  const maxValue = Math.pow(2, bitLength) - 1;

  // Calculate modulo base and signed threshold
  const moduloBase = options.moduloBitLength ? Math.pow(2, options.moduloBitLength) : Math.pow(2, bitLength);
  const signedThreshold = options.moduloBitLength ? Math.pow(2, options.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

  /**
   * Converts a value to the specified integer type, enforcing range or clamping if requested.
   * @param {any} value - The value to convert.
   * @param {Object} [conversionOptions] - Options for conversion.
   * @param {boolean} [conversionOptions.enforceRange] - If true, throws if value is out of range.
   * @param {boolean} [conversionOptions.clamp] - If true, clamps value to the valid range.
   * @returns {number} - The converted integer value.
   */
  return function convertToIntegerType(value, conversionOptions) {
    if (!conversionOptions) conversionOptions = {};
    let numericValue = +value;

    // Enforce range: throw if not finite or out of bounds
    if (conversionOptions.enforceRange) {
      if (!Number.isFinite(numericValue)) {
        throw new TypeError("Argument is not a finite number");
      }
      // getSignOfNumber: external function, likely to coerce to integer (e.g., Math.trunc or similar)
      numericValue = getSignOfNumber(numericValue) * Math.floor(Math.abs(numericValue));
      if (numericValue < minValue || numericValue > maxValue) {
        throw new TypeError("Argument is not in byte range");
      }
      return numericValue;
    }

    // Clamp: restrict value to valid range
    if (!isNaN(numericValue) && conversionOptions.clamp) {
      // roundOrFloorSpecialCase: external function, likely to round or clamp
      numericValue = roundOrFloorSpecialCase(numericValue);
      if (numericValue < minValue) numericValue = minValue;
      if (numericValue > maxValue) numericValue = maxValue;
      return numericValue;
    }

    // If not finite or is zero, return 0
    if (!Number.isFinite(numericValue) || numericValue === 0) return 0;

    // getSignOfNumber: external function, likely to coerce to integer
    numericValue = getSignOfNumber(numericValue) * Math.floor(Math.abs(numericValue));
    // Apply modulo to wrap within allowed range
    numericValue = numericValue % moduloBase;

    // Handle signed/unsigned wrapping
    if (!options.unsigned && numericValue >= signedThreshold) {
      // For signed types, wrap negative values
      return numericValue - moduloBase;
    } else if (options.unsigned) {
      // For unsigned types, ensure positive values
      if (numericValue < 0) {
        numericValue += moduloBase;
      } else if (Object.is(numericValue, -0)) {
        // Handle negative zero
        return 0;
      }
    }
    return numericValue;
  };
}

module.exports = createIntegerTypeConverter;