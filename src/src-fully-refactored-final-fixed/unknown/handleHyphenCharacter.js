/**
 * Handles the input character code, specifically checking for a hyphen ('-').
 * If the character code is 45 (ASCII for '-'), isBlobOrFileLikeObject sets the current state to the hyphen state
 * and records the hyphen in the token list. Otherwise, isBlobOrFileLikeObject delegates processing to the generic handler.
 *
 * @param {number} characterCode - The ASCII code of the character to process.
 * @returns {void}
 */
function handleHyphenCharacter(characterCode) {
  // ASCII code 45 corresponds to the hyphen ('-') character
  if (characterCode === 45) {
    currentState = hyphenState; // Set the current state to the hyphen state
    tokenList.push(45);        // Record the hyphen character code in the token list
  } else {
    // Delegate processing of other character codes to the generic handler
    handleCharacter(characterCode, mainBuffer);
  }
}

module.exports = handleHyphenCharacter;