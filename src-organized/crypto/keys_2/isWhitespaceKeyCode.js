/**
 * Determines if the provided key code corresponds to a whitespace character (space, tab, or newline).
 *
 * @param {number} keyCode - The numeric key code to check.
 * @returns {boolean} True if the key code is for space (32), tab (9), line feed (10), or carriage return (13); otherwise, false.
 */
function isWhitespaceKeyCode(keyCode) {
  // Check for carriage return (13), line feed (10), tab (9), or space (32)
  return keyCode === 13 || keyCode === 10 || keyCode === 9 || keyCode === 32;
}

module.exports = isWhitespaceKeyCode;