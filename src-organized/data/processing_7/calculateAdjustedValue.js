/**
 * Calculates an adjusted value based on the input and global offsets.
 * If the global conditionFlag is true, applies a transformation function; otherwise, returns the adjusted value directly.
 *
 * @param {number} inputValue - The primary input value to be adjusted.
 * @returns {number} The adjusted value, possibly transformed by the global function transformFunction.
 */
function calculateAdjustedValue(inputValue) {
  // Calculate the offset from the global baseOffset
  const offsetFromBase = inputValue - globalBaseOffset;

  // Calculate the offset from the global referenceOffset
  const offsetFromReference = inputValue - globalReferenceOffset;

  // Compute the adjusted value by subtracting the offset from the global initialValue
  const adjustedValue = globalInitialValue - offsetFromBase;

  // If the global conditionFlag is true, apply the transformation function
  if (globalConditionFlag) {
    return transformFunction(adjustedValue, globalLimit - offsetFromReference);
  }

  // Otherwise, return the adjusted value directly
  return adjustedValue;
}

module.exports = calculateAdjustedValue;