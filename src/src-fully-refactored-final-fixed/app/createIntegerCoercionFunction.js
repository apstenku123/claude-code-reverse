/**
 * Creates a function that coerces a value into a specific integer range, with options for unsigned, clamping, and range enforcement.
 *
 * @param {number} bitLength - The number of bits representing the integer type (e.g., 8 for int8/uint8).
 * @param {Object} options - Configuration options for coercion.
 * @param {boolean} [options.unsigned=false] - If true, treats the value as unsigned.
 * @param {number} [options.moduloBitLength] - If set, uses this bit length for modulo operations instead of bitLength.
 * @returns {function(any, Object=): number} - a function that coerces a value according to the specified options and range.
 */
function createIntegerCoercionFunction(bitLength, options) {
  // Adjust bit length for signed types
  if (!options.unsigned) {
    bitLength--;
  }

  // Calculate minimum and maximum representable values
  const minValue = options.unsigned ? 0 : -Math.pow(2, bitLength);
  const maxValue = Math.pow(2, bitLength) - 1;

  // Calculate modulo base and threshold for signed wrapping
  const moduloBase = options.moduloBitLength ? Math.pow(2, options.moduloBitLength) : Math.pow(2, bitLength);
  const signedThreshold = options.moduloBitLength ? Math.pow(2, options.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

  /**
   * Coerces a value into the specified integer range, with optional clamping or range enforcement.
   * @param {any} value - The value to coerce.
   * @param {Object} [coercionOptions] - Options for coercion.
   * @param {boolean} [coercionOptions.enforceRange] - If true, throws if value is out of range.
   * @param {boolean} [coercionOptions.clamp] - If true, clamps value to the valid range.
   * @returns {number} - The coerced integer value.
   */
  return function coerceIntegerValue(value, coercionOptions) {
    if (!coercionOptions) coercionOptions = {};
    let numberValue = +value;

    // Enforce range: throw if not finite or out of bounds
    if (coercionOptions.enforceRange) {
      if (!Number.isFinite(numberValue)) {
        throw new TypeError("Argument is not a finite number");
      }
      // getSignOfNumber and Math.floor(Math.abs(...)) ensure integer conversion (getSignOfNumber is assumed to be a custom integer conversion function)
      numberValue = getSignOfNumber(numberValue) * Math.floor(Math.abs(numberValue));
      if (numberValue < minValue || numberValue > maxValue) {
        throw new TypeError("Argument is not in byte range");
      }
      return numberValue;
    }

    // Clamp: restrict value to the valid range
    if (!isNaN(numberValue) && coercionOptions.clamp) {
      numberValue = roundOrFloorSpecialCase(numberValue); // roundOrFloorSpecialCase is assumed to be a custom clamping/rounding function
      if (numberValue < minValue) numberValue = minValue;
      if (numberValue > maxValue) numberValue = maxValue;
      return numberValue;
    }

    // If not finite or zero, return 0
    if (!Number.isFinite(numberValue) || numberValue === 0) return 0;

    // Integer conversion and modulo operation
    numberValue = getSignOfNumber(numberValue) * Math.floor(Math.abs(numberValue));
    numberValue = numberValue % moduloBase;

    // Handle signed wrapping
    if (!options.unsigned && numberValue >= signedThreshold) {
      return numberValue - moduloBase;
    } else if (options.unsigned) {
      if (numberValue < 0) {
        numberValue += moduloBase;
      } else if (Object.is(numberValue, -0)) {
        // Special case: treat -0 as 0 for unsigned
        return 0;
      }
    }
    return numberValue;
  };
}

module.exports = createIntegerCoercionFunction;
