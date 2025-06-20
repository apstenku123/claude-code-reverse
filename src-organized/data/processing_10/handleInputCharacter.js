/**
 * Handles an input character code and updates the parser state accordingly.
 *
 * Depending on the character code provided, this function updates the global parser state variable,
 * pushes a corresponding value to the character buffer, or invokes an end-of-input handler.
 *
 * @param {number} characterCode - The Unicode code point of the input character to process.
 * @returns {void}
 */
function handleInputCharacter(characterCode) {
  switch (characterCode) {
    case 45: // Hyphen-minus '-'
      parserState = parserStateHyphen;
      characterBuffer.push(45);
      break;
    case 60: // Less-than sign '<'
      parserState = parserStateLessThan;
      characterBuffer.push(60);
      break;
    case 0: // NULL character
      parserState = parserStateNull;
      characterBuffer.push(65533); // Replacement character
      break;
    case -1: // End of input
      handleEndOfInput();
      break;
    default:
      parserState = parserStateNull;
      characterBuffer.push(characterCode);
      break;
  }
}

module.exports = handleInputCharacter;