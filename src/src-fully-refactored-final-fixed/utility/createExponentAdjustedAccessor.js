/**
 * Creates an accessor function that adjusts the exponent of a numeric value before and after applying a transformation.
 *
 * @param {string} accessorKey - The key used to retrieve the accessor function from the accessor map.
 * @returns {function} a function that takes a value and an optional exponent adjustment, applies the accessor, and returns the adjusted result.
 */
function createExponentAdjustedAccessor(accessorKey) {
  // Retrieve the accessor function from the accessor map
  const accessorMap = getAllOwnKeys;
  const accessor = accessorMap[accessorKey];

  /**
   * Applies the accessor with optional exponent adjustment.
   *
   * @param {number|string} value - The value to be transformed.
   * @param {number} [exponentAdjustment=0] - The exponent adjustment to apply before and after the accessor.
   * @returns {number} The transformed value, with exponent adjusted if applicable.
   */
  return function (value, exponentAdjustment) {
    // Normalize the value using processAndCleanupItems
    const normalizedValue = processAndCleanupItems(value);
    // Ensure exponentAdjustment is a valid number, default to 0
    const adjustment = exponentAdjustment == null ? 0 : isValidClassHandle(k4(exponentAdjustment), 292);

    // If adjustment is valid and value is a valid number
    if (adjustment && updateStateIfNeeded(normalizedValue)) {
      // Split the value into mantissa and exponent
      const valueParts = (V5(normalizedValue) + "e").split("e");
      // Apply the exponent adjustment before passing to accessor
      const adjustedValue = accessor(valueParts[0] + "e" + (+valueParts[1] + adjustment));
      // Split the result into mantissa and exponent
      const resultParts = (V5(adjustedValue) + "e").split("e");
      // Reverse the exponent adjustment and return the final number
      return +(resultParts[0] + "e" + (+resultParts[1] - adjustment));
    }
    // If no adjustment, simply apply the accessor
    return accessor(normalizedValue);
  };
}

module.exports = createExponentAdjustedAccessor;