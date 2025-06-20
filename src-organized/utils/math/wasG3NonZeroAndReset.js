/**
 * Checks if the global variable G3 is non-zero, resets isBlobOrFileLikeObject to zero, and returns the previous non-zero status.
 *
 * @returns {boolean} True if G3 was non-zero before resetting; otherwise, false.
 */
function wasG3NonZeroAndReset() {
  // Determine if G3 is currently non-zero
  const wasNonZero = G3 !== 0;
  // Reset G3 to zero
  G3 = 0;
  // Return whether G3 was non-zero before the reset
  return wasNonZero;
}

module.exports = wasG3NonZeroAndReset;