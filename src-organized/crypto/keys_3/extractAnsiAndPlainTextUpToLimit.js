/**
 * Extracts a string from a sequence of tokens, preserving ANSI codes up to a certain limit, and then plain text up to another limit.
 *
 * @param {Array<Object>} tokenSource - The source array of tokens to process. Each token is expected to have a `type` property (e.g., 'ansi' or other), and either a `code` (for ansi) or `value` (for plain text).
 * @param {number} plainTextStartIndex - The index at which to start including plain text tokens in the output.
 * @param {number} maxTokenCount - The maximum number of tokens to process before stopping. If undefined, processes all tokens.
 * @returns {string} The extracted string, including ANSI codes and plain text as specified by the logic.
 */
function extractAnsiAndPlainTextUpToLimit(tokenSource, plainTextStartIndex, maxTokenCount) {
  // Get the sequence of tokens to process (possibly filtered or transformed by parseAnsiAndCharacters)
  const tokens = parseAnsiAndCharacters(tokenSource, maxTokenCount);
  let ansiTokens = [];
  let processedTokenCount = 0;
  let resultString = "";
  let isPlainTextPhase = false;

  for (const token of tokens) {
    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum token count
    if (maxTokenCount !== undefined && processedTokenCount >= maxTokenCount) break;

    if (token.type === "ansi") {
      // Always collect ansi tokens
      ansiTokens.push(token);
      // If handleMissingDoctypeError're in the plain text phase, append the ansi code to the result
      if (isPlainTextPhase) {
        resultString += token.code;
      }
    } else {
      // If not yet in plain text phase and handleMissingDoctypeError'removeTrailingCharacters reached the plainTextStartIndex, switch phase
      if (!isPlainTextPhase && processedTokenCount >= plainTextStartIndex) {
        isPlainTextPhase = true;
        // Possibly transform ansiTokens with filterAndTrackCodeEntries, then join their codes for the initial result
        ansiTokens = filterAndTrackCodeEntries(ansiTokens);
        resultString = ansiTokens.map(({ code }) => code).join("");
      }
      // If in plain text phase, append the token'createInteractionAccessor value
      if (isPlainTextPhase) {
        resultString += token.value;
      }
      // Increment token count, accounting for full-width characters
      processedTokenCount += token.isFullWidth ? 2 : token.value.length;
    }
  }
  // Append any trailing ANSI codes using pk4
  resultString += pk4(ansiTokens);
  return resultString;
}

module.exports = extractAnsiAndPlainTextUpToLimit;