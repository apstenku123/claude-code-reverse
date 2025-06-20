/**
 * Determines if the provided interaction entry is a valid route interaction.
 *
 * Checks the given interaction entry against multiple validation functions and properties:
 * - Returns true if J8 (custom validation) passes
 * - Returns true if rE (alternate validation) passes
 * - Returns true if l2A (property key) exists and the entry has a truthy value for that property
 *
 * @param {object} interactionEntry - The user interaction entry to validate.
 * @returns {boolean} True if the interaction entry is considered a valid route interaction; otherwise, false.
 */
function isValidInteractionRoute(interactionEntry) {
  // Check if the interaction entry passes the first validation function
  if (J8(interactionEntry)) {
    return true;
  }

  // Check if the interaction entry passes the alternate validation function
  if (rE(interactionEntry)) {
    return true;
  }

  // Check if l2A is defined, and the interaction entry has a truthy value for the l2A property
  if (l2A && interactionEntry && interactionEntry[l2A]) {
    return true;
  }

  // If none of the above checks pass, return false
  return false;
}

module.exports = isValidInteractionRoute;