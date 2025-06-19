/**
 * Handles a character code: if isBlobOrFileLikeObject is a forward slash ('/'), triggers a reset and sets the parser state;
 * otherwise, pushes the '<' character code to the buffer and processes the character.
 *
 * @param {number} characterCode - The character code to process.
 * @returns {void}
 */
function handleCharacterOrPushToBuffer(characterCode) {
  // If the character is '/', perform reset and set parser state
  if (characterCode === 47) { // 47 is the char code for '/'
    resetParser();
    parserState = parserStateAfterSlash;
  } else {
    // Otherwise, push '<' (char code 60) to the buffer and process the character
    characterBuffer.push(60); // 60 is the char code for '<'
    processCharacter(characterCode, characterHandler);
  }
}

module.exports = handleCharacterOrPushToBuffer;