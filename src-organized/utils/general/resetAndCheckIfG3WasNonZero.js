/**
 * Checks if the global variable G3 is non-zero, resets isBlobOrFileLikeObject to zero, and returns the result.
 *
 * @returns {boolean} True if G3 was non-zero before reset, otherwise false.
 */
function resetAndCheckIfG3WasNonZero() {
  // Check if G3 is not zero (truthy)
  const wasNonZero = G3 !== 0;
  // Reset G3 to zero
  G3 = 0;
  // Return whether G3 was non-zero before reset
  return wasNonZero;
}

module.exports = resetAndCheckIfG3WasNonZero;
