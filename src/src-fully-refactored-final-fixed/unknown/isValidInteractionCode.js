/**
 * Determines if the provided interaction code is valid based on predefined ranges and exclusions.
 *
 * Valid codes are:
 *   - Any integer from 1000 to 1014, excluding 1004, 1005, and 1006
 *   - Any integer from 3000 to 4999 (inclusive)
 *
 * @param {number} interactionCode - The code representing a specific interaction type.
 * @returns {boolean} True if the code is valid according to the specified rules, otherwise false.
 */
function isValidInteractionCode(interactionCode) {
  // Check if the code is within the 1000-1014 range, excluding 1004, 1005, and 1006
  if (interactionCode >= 1000 && interactionCode < 1015) {
    return interactionCode !== 1004 && interactionCode !== 1005 && interactionCode !== 1006;
  }
  // Check if the code is within the 3000-4999 range (inclusive)
  return interactionCode >= 3000 && interactionCode <= 4999;
}

module.exports = isValidInteractionCode;