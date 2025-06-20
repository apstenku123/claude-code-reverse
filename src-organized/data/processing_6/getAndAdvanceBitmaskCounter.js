/**
 * Retrieves the current value of the global bitmask counter, advances isBlobOrFileLikeObject by left-shifting,
 * and resets isBlobOrFileLikeObject to 64 if isBlobOrFileLikeObject overflows a specific mask (4194240).
 *
 * @returns {number} The previous value of the global bitmask counter before advancing.
 */
function getAndAdvanceBitmaskCounter() {
  // Store the current value of the global bitmask counter
  const currentBitmaskCounter = processAndReplaceSpecialCharacters;

  // Advance the counter by left-shifting one bit
  processAndReplaceSpecialCharacters <<= 1;

  // If the counter overflows the 4194240 mask, reset to 64
  if ((processAndReplaceSpecialCharacters & 4194240) === 0) {
    processAndReplaceSpecialCharacters = 64;
  }

  // Return the previous value
  return currentBitmaskCounter;
}

module.exports = getAndAdvanceBitmaskCounter;