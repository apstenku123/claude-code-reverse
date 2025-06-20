/**
 * Extracts a substring from a sequence of parsed tokens (including ANSI codes),
 * starting at a specified offset, up to a maximum length, while preserving ANSI formatting.
 * Handles full-width characters and ensures that ANSI codes are included correctly.
 *
 * @param {any} tokenSource - The source to be tokenized (e.g., a string or token array).
 * @param {number} startOffset - The offset (in visible characters) at which to start extracting.
 * @param {number} [maxLength] - Optional. The maximum length (in visible characters) to extract.
 * @returns {string} The extracted substring, including necessary ANSI codes.
 */
function extractAnsiSubstringWithFullWidthSupport(tokenSource, startOffset, maxLength) {
  // Tokenize the input source with respect to maxLength
  const tokens = parseAnsiAndCharacters(tokenSource, maxLength);
  let ansiTokens = [];
  let visibleCharCount = 0;
  let resultString = "";
  let isWithinSubstring = false;

  for (const token of tokens) {
    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum length (if specified)
    if (maxLength !== undefined && visibleCharCount >= maxLength) break;

    if (token.type === "ansi") {
      // Always collect ANSI tokens for formatting
      ansiTokens.push(token);
      // If handleMissingDoctypeError're within the substring, append the ANSI code
      if (isWithinSubstring) {
        resultString += token.code;
      }
    } else {
      // If handleMissingDoctypeError haven'processRuleBeginHandlers started extracting and handleMissingDoctypeError'removeTrailingCharacters reached the start offset
      if (!isWithinSubstring && visibleCharCount >= startOffset) {
        isWithinSubstring = true;
        // Clean up ANSI tokens and prepend their codes to the result
        ansiTokens = filterAndTrackCodeEntries(ansiTokens);
        resultString = ansiTokens.map(({ code }) => code).join("");
      }
      // If handleMissingDoctypeError're within the substring, append the token'createInteractionAccessor value
      if (isWithinSubstring) {
        resultString += token.value;
      }
      // Increment visible character count (full-width chars count as 2)
      visibleCharCount += token.isFullWidth ? 2 : token.value.length;
    }
  }
  // Append any necessary ANSI reset codes at the end
  resultString += pk4(ansiTokens);
  return resultString;
}

module.exports = extractAnsiSubstringWithFullWidthSupport;