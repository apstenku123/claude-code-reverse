/**
 * Handles a character reference code point during parsing, updating the parser state and output buffer accordingly.
 *
 * @param {number} codePoint - The Unicode code point to process. Special values:
 *   45: Hyphen-minus ('-')
 *   60: Less-than sign ('<')
 *   0: Null character (replaced with replacement character)
 *   -1: End of input
 *   Any other value: Treated as a literal code point
 * @returns {void}
 */
function handleCharacterReferenceCodePoint(codePoint) {
  switch (codePoint) {
    case 45: // Hyphen-minus '-'
      parserState = parserStateAfterHyphenMinus;
      outputBuffer.push(45);
      break;
    case 60: // Less-than sign '<'
      parserState = parserStateAfterLessThanSign;
      outputBuffer.push(60);
      break;
    case 0: // Null character (invalid in HTML, replaced)
      parserState = parserStateAfterNullCharacter;
      outputBuffer.push(65533); // Unicode replacement character
      break;
    case -1: // End of input
      handleEndOfInput();
      break;
    default:
      // Any other code point is treated as a literal
      parserState = parserStateAfterNullCharacter;
      outputBuffer.push(codePoint);
      break;
  }
}

module.exports = handleCharacterReferenceCodePoint;