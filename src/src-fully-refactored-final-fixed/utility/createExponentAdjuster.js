/**
 * Creates a function that adjusts the exponent of a number by a specified amount, using a provided transformation function.
 *
 * @param {string} transformationKey - The key used to retrieve the transformation function from the getAllOwnKeys object.
 * @returns {function} a function that takes a value and an optional exponent adjustment, and returns the adjusted value.
 */
function createExponentAdjuster(transformationKey) {
  // Retrieve the transformation function from the getAllOwnKeys object using the provided key
  const transformFunction = getAllOwnKeys[transformationKey];

  /**
   * Adjusts the exponent of the given value by the specified amount.
   *
   * @param {number|string} value - The value to be transformed and adjusted.
   * @param {number} [exponentAdjustment=0] - The amount to adjust the exponent by.
   * @returns {number} The transformed value with the adjusted exponent.
   */
  return function (value, exponentAdjustment) {
    // Normalize the value using processAndCleanupItems
    const normalizedValue = processAndCleanupItems(value);
    // Ensure exponentAdjustment is a valid number, defaulting to 0 if null/undefined
    const adjustment = exponentAdjustment == null ? 0 : isClassHandleValid(k4(exponentAdjustment), 292);
    // If adjustment is valid and value is a valid number
    if (adjustment && updateStateIfNeeded(normalizedValue)) {
      // Split the value into mantissa and exponent parts
      let [mantissa, exponent] = (V5(normalizedValue) + "e").split("e");
      // Apply the transformation function with the adjusted exponent
      const transformedValue = transformFunction(mantissa + "e" + (+exponent + adjustment));
      // Split the transformed value again into mantissa and exponent
      let [newMantissa, newExponent] = (V5(transformedValue) + "e").split("e");
      // Return the final adjusted number
      return +(newMantissa + "e" + (+newExponent - adjustment));
    }
    // If no adjustment, just apply the transformation function
    return transformFunction(normalizedValue);
  };
}

module.exports = createExponentAdjuster;