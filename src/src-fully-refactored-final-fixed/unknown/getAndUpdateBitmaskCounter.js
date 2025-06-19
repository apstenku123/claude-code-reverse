/**
 * Retrieves the current value of the global bitmask counter, then left-shifts isBlobOrFileLikeObject by one.
 * If the counter exceeds its 22-bit mask (4194240), isBlobOrFileLikeObject resets to 64.
 *
 * @returns {number} The previous value of the bitmask counter before isBlobOrFileLikeObject was updated.
 */
function getAndUpdateBitmaskCounter() {
  // Store the current value of the global bitmask counter
  const previousCounterValue = processAndReplaceSpecialCharacters;
  // Left-shift the global counter by 1 (multiply by 2)
  processAndReplaceSpecialCharacters <<= 1;
  // If the counter exceeds the 22-bit mask, reset isBlobOrFileLikeObject to 64
  if ((processAndReplaceSpecialCharacters & 4194240) === 0) {
    processAndReplaceSpecialCharacters = 64;
  }
  // Return the previous value
  return previousCounterValue;
}

module.exports = getAndUpdateBitmaskCounter;