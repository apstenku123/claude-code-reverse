/**
 * Determines if the provided interaction entry is valid based on multiple validation strategies.
 *
 * This function checks the given interaction entry using three different validation methods:
 *   1. Checks if the entry passes the J8 validation.
 *   2. Checks if the entry passes the rE validation.
 *   3. Checks if the global l2A property exists, and if so, whether the entry has a truthy value for that property.
 *
 * @param {object} interactionEntry - The interaction entry object to validate.
 * @returns {boolean} True if the interaction entry is valid according to any of the validation strategies; otherwise, false.
 */
function isValidInteractionEntry(interactionEntry) {
  // First validation: Check using J8 function
  if (J8(interactionEntry)) {
    return true;
  }

  // Second validation: Check using rE function
  if (rE(interactionEntry)) {
    return true;
  }

  // Third validation: Check if l2A is defined and the entry has a truthy value for that property
  if (l2A && interactionEntry && interactionEntry[l2A]) {
    return true;
  }

  // If none of the validations passed, return false
  return false;
}

module.exports = isValidInteractionEntry;