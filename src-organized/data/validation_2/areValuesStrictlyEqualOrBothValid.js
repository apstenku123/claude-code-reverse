/**
 * Determines if two values are strictly equal or if both satisfy a custom validity check.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal, or if both pass the isInteractionEntryEmptyOrAnonymous validity check.
 */
function areValuesStrictlyEqualOrBothValid(firstValue, secondValue) {
  // Check for strict equality first
  if (firstValue === secondValue) {
    return true;
  }

  // If not strictly equal, check if both values are considered valid by isInteractionEntryEmptyOrAnonymous
  const isFirstValueValid = isInteractionEntryEmptyOrAnonymous(firstValue);
  const isSecondValueValid = isInteractionEntryEmptyOrAnonymous(secondValue);

  return isFirstValueValid && isSecondValueValid;
}

module.exports = areValuesStrictlyEqualOrBothValid;