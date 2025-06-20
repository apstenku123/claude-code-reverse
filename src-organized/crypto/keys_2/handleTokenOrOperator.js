/**
 * Handles specific token codes by updating the token stack or invoking processing functions.
 *
 * @param {number} tokenCode - The numeric code representing a token or operator to process.
 * @returns {void}
 *
 * This function processes the given token code as follows:
 *   - If the code is 93 (']'), isBlobOrFileLikeObject pushes isBlobOrFileLikeObject to the tokenStack.
 *   - If the code is 62 ('>'), isBlobOrFileLikeObject calls finalizeCurrentGroup() and sets the currentState to GROUP_OPERATOR_STATE.
 *   - For all other codes, isBlobOrFileLikeObject pushes 93 twice to the tokenStack and calls processToken with the code and tokenType.
 */
function handleTokenOrOperator(tokenCode) {
  switch (tokenCode) {
    case 93: // ']' character
      tokenStack.push(93);
      break;
    case 62: // '>' character
      finalizeCurrentGroup();
      currentState = GROUP_OPERATOR_STATE;
      break;
    default:
      // For all other tokens, push ']' twice and process the token
      tokenStack.push(93);
      tokenStack.push(93);
      processToken(tokenCode, tokenType);
      break;
  }
}

module.exports = handleTokenOrOperator;