/**
 * Determines if the provided interaction entry code is valid based on specific rules.
 *
 * Codes from 1000 to 1014 (inclusive) are valid except for 1004, 1005, and 1006.
 * Codes from 3000 to 4999 (inclusive) are also considered valid.
 *
 * @param {number} interactionEntryCode - The code representing an interaction entry to validate.
 * @returns {boolean} True if the code is valid according to the specified rules, false otherwise.
 */
function isValidInteractionEntryCode(interactionEntryCode) {
  // Check if the code is in the 1000-1014 range, excluding 1004, 1005, and 1006
  if (
    interactionEntryCode >= 1000 &&
    interactionEntryCode < 1015
  ) {
    return (
      interactionEntryCode !== 1004 &&
      interactionEntryCode !== 1005 &&
      interactionEntryCode !== 1006
    );
  }

  // Check if the code is in the 3000-4999 range
  return interactionEntryCode >= 3000 && interactionEntryCode <= 4999;
}

module.exports = isValidInteractionEntryCode;