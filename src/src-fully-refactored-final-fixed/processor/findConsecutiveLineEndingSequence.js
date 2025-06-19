/**
 * Scans an array of character codes to find the position immediately after specific consecutive line ending sequences.
 *
 * The function looks for the following patterns:
 *   1. Two consecutive LF (10, 10)
 *   2. Two consecutive CR (13, 13)
 *   3. a CRLFCRLF sequence (13, 10, 13, 10)
 *
 * Returns the index immediately after the detected sequence, or -1 if none found.
 *
 * @param {number[]} charCodes - Array of character codes to scan.
 * @returns {number} Index immediately after the detected sequence, or -1 if not found.
 */
function findConsecutiveLineEndingSequence(charCodes) {
  // Iterate through the array, stopping before the last element to avoid out-of-bounds access
  for (let index = 0; index < charCodes.length - 1; index++) {
    // Check for two consecutive LF (Line Feed, ASCII 10)
    if (charCodes[index] === 10 && charCodes[index + 1] === 10) {
      return index + 2;
    }
    // Check for two consecutive CR (Carriage Return, ASCII 13)
    if (charCodes[index] === 13 && charCodes[index + 1] === 13) {
      return index + 2;
    }
    // Check for CRLFCRLF sequence (13, 10, 13, 10)
    if (
      charCodes[index] === 13 &&
      charCodes[index + 1] === 10 &&
      index + 3 < charCodes.length && // Ensure handleMissingDoctypeError don'processRuleBeginHandlers go out of bounds
      charCodes[index + 2] === 13 &&
      charCodes[index + 3] === 10
    ) {
      return index + 4;
    }
  }
  // Return -1 if no sequence is found
  return -1;
}

module.exports = findConsecutiveLineEndingSequence;