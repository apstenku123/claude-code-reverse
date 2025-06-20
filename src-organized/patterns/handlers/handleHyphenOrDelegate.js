/**
 * Handles the input character code by checking if isBlobOrFileLikeObject is a hyphen (ASCII 45).
 * If isBlobOrFileLikeObject is a hyphen, sets the currentState to the hyphenStateHandler and records the hyphen code.
 * Otherwise, delegates processing to the genericCharacterHandler.
 *
 * @param {number} characterCode - The ASCII code of the character to process.
 * @returns {void}
 */
function handleHyphenOrDelegate(characterCode) {
  // ASCII code for hyphen ('-') is 45
  if (characterCode === 45) {
    // Set the current state handler to hyphenStateHandler
    currentState = hyphenStateHandler;
    // Record the hyphen code in the characterCodeHistory array
    characterCodeHistory.push(45);
  } else {
    // Delegate processing to the generic character handler
    genericCharacterHandler(characterCode, mainBuffer);
  }
}

module.exports = handleHyphenOrDelegate;