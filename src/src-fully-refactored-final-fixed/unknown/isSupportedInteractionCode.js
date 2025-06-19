/**
 * Determines if the provided interaction code falls within supported ranges.
 *
 * Supported codes are:
 *   - 1000 to 1014 (excluding 1004, 1005, and 1006)
 *   - 3000 to 4999 (inclusive)
 *
 * @param {number} interactionCode - The code representing a specific interaction type.
 * @returns {boolean} True if the code is supported, false otherwise.
 */
function isSupportedInteractionCode(interactionCode) {
  // Check if the code is in the 1000-1014 range, but not 1004, 1005, or 1006
  const isInFirstRange =
    interactionCode >= 1000 &&
    interactionCode <= 1014 &&
    interactionCode !== 1004 &&
    interactionCode !== 1005 &&
    interactionCode !== 1006;

  // Check if the code is in the 3000-4999 range
  const isInSecondRange =
    interactionCode >= 3000 && interactionCode <= 4999;

  // Return true if the code is in either supported range
  return isInFirstRange || isInSecondRange;
}

module.exports = isSupportedInteractionCode;