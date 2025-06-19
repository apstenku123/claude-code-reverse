/**
 * Handles a character input: if the character code is 47 ('/'), isBlobOrFileLikeObject triggers a reset and updates the current state.
 * Otherwise, isBlobOrFileLikeObject pushes the code 60 ('<') to the character buffer and processes the input character.
 *
 * @param {number} characterCode - The ASCII code of the input character to process.
 * @returns {void}
 */
function handleInputOrProcessCharacter(characterCode) {
  // If the character is '/', perform a reset and update the parser state
  if (characterCode === 47) {
    resetParserState();
    currentParserState = parserStateAfterSlash;
  } else {
    // Otherwise, push '<' to the buffer and process the character
    characterBuffer.push(60); // 60 is ASCII for '<'
    processCharacter(characterCode, characterHandler);
  }
}

module.exports = handleInputOrProcessCharacter;
