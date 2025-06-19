/**
 * Handles special comment token processing based on the given character code.
 *
 * This function processes a character code as part of a comment parsing routine. Depending on the code,
 * isBlobOrFileLikeObject updates the output buffer, sets the parser state, and triggers external handlers as needed.
 *
 * @param {number} charCode - The character code to process (e.g., 45 for '-', 62 for '>', -1 for EOF).
 * @returns {void}
 */
function handleCommentToken(charCode) {
  // External/global variables and functions assumed to be defined elsewhere:
  // outputBuffer (Array), parserState (number), COMMENT_STATE (number),
  // END_COMMENT_STATE (number), handleOutput (function),
  // processCommentChar (function), resetParser (function),
  // inputBuffer (Array), buildOutput (function)

  switch (charCode) {
    case 45: // Hyphen '-'
      // Add '--!' to the output buffer and set parser state to COMMENT_STATE
      outputBuffer.push(45); // '-'
      outputBuffer.push(45); // '-'
      outputBuffer.push(33); // '!'
      parserState = COMMENT_STATE;
      break;
    case 62: // Greater-than '>'
      // Finalize comment and set parser state to END_COMMENT_STATE
      parserState = END_COMMENT_STATE;
      handleOutput(inputBuffer, buildOutput(outputBuffer));
      break;
    case -1: // End of input
      // Finalize comment and reset parser
      handleOutput(inputBuffer, buildOutput(outputBuffer));
      resetParser();
      break;
    default:
      // For any other character, treat as comment content
      outputBuffer.push(45); // '-'
      outputBuffer.push(45); // '-'
      outputBuffer.push(33); // '!'
      processCommentChar(charCode, COMMENT_CHAR_HANDLER);
      break;
  }
}

module.exports = handleCommentToken;