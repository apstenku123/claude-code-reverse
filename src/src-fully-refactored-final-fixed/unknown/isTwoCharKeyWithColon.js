/**
 * Checks if the provided string is exactly two characters long, starts with a valid key code (as determined by `isValidKeyCode`),
 * and the second character is a colon (":").
 *
 * @param {string} keyString - The string to validate as a key with a colon suffix.
 * @returns {boolean} True if the string matches the pattern: [valid key code]:, otherwise false.
 */
function isTwoCharKeyWithColon(keyString) {
  // Check if the string is exactly two characters long
  if (keyString.length !== 2) {
    return false;
  }

  // Check if the first character is a valid key code using the external isValidKeyCode function
  const isFirstCharValidKey = isValidKeyCode(keyString.codePointAt(0));

  // Check if the second character is a colon
  const isSecondCharColon = keyString[1] === ":";

  // Return true only if both conditions are met
  return isFirstCharValidKey && isSecondCharColon;
}

// Export the function for use in other modules
module.exports = isTwoCharKeyWithColon;