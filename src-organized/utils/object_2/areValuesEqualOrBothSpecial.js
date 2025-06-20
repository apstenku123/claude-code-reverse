/**
 * Determines if two values are strictly equal or if both satisfy a special condition.
 *
 * This function first checks if the two provided values are strictly equal (using ===).
 * If not, isBlobOrFileLikeObject checks if both values satisfy the `isSpecialValue` condition (as defined by the external `isInteractionEntryEmptyOrAnonymous` function).
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} Returns true if the values are strictly equal, or if both satisfy the special condition; otherwise, false.
 */
function areValuesEqualOrBothSpecial(firstValue, secondValue) {
  // Check for strict equality first
  if (firstValue === secondValue) {
    return true;
  }

  // If not strictly equal, check if both are 'special' according to isInteractionEntryEmptyOrAnonymous
  return isSpecialValue(firstValue) && isSpecialValue(secondValue);
}

// Alias for the external dependency (assumed to be imported elsewhere)
const isSpecialValue = isInteractionEntryEmptyOrAnonymous;

module.exports = areValuesEqualOrBothSpecial;