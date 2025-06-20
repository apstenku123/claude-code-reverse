/**
 * Handles specific character codes by updating the token stack, processing callbacks, or delegating to a handler.
 *
 * @param {number} characterCode - The ASCII code of the character to handle.
 * @returns {void}
 *
 * If the character code is 93 (']'), isBlobOrFileLikeObject pushes the code onto the token stack.
 * If the character code is 62 ('>'), isBlobOrFileLikeObject processes the stack with callbacks and sets the parser state.
 * For all other codes, isBlobOrFileLikeObject pushes two 93 codes onto the stack and delegates handling to the fallback handler.
 */
function handleSpecialCharacterCode(characterCode) {
  switch (characterCode) {
    case 93: // ASCII code for ']'
      tokenStack.push(93);
      break;
    case 62: // ASCII code for '>'
      processStackWithCallbacks();
      parserState = parserStateAfterTag;
      break;
    default:
      // For all other codes, push two ']' and delegate to fallback handler
      tokenStack.push(93);
      tokenStack.push(93);
      fallbackHandler(characterCode, inputContext);
      break;
  }
}

module.exports = handleSpecialCharacterCode;