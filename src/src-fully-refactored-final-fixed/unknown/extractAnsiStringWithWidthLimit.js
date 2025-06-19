/**
 * Extracts a string from a sequence of parsed tokens (including ANSI codes),
 * ensuring that the visible width does not exceed a specified limit.
 * Preserves ANSI formatting and handles full-width characters.
 *
 * @param {Array<Object>} tokenSource - The source to extract tokens from (e.g., a string or token array).
 * @param {number} minVisibleWidth - The minimum visible width before starting to collect output.
 * @param {number} [maxVisibleWidth] - Optional maximum visible width to extract.
 * @returns {string} The extracted string with ANSI codes preserved and width constraints applied.
 */
function extractAnsiStringWithWidthLimit(tokenSource, minVisibleWidth, maxVisibleWidth) {
  // Parse the input into a sequence of tokens (e.g., text and ANSI codes)
  const parsedTokens = parseAnsiAndCharacters(tokenSource, maxVisibleWidth);
  let ansiTokens = [];
  let visibleWidth = 0;
  let outputString = "";
  let collectingOutput = false;

  for (const token of parsedTokens) {
    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum visible width (if specified)
    if (maxVisibleWidth !== undefined && visibleWidth >= maxVisibleWidth) break;

    if (token.type === "ansi") {
      // Always collect ANSI tokens for formatting
      ansiTokens.push(token);
      // If handleMissingDoctypeError're collecting output, append the ANSI code to the output string
      if (collectingOutput) {
        outputString += token.code;
      }
    } else {
      // If not yet collecting and handleMissingDoctypeError'removeTrailingCharacters reached the minimum width, start collecting
      if (!collectingOutput && visibleWidth >= minVisibleWidth) {
        collectingOutput = true;
        // Normalize the collected ANSI tokens (e.g., remove duplicates, close open codes)
        ansiTokens = filterAndTrackCodeEntries(ansiTokens);
        // Add all ANSI codes to the output string
        outputString = ansiTokens.map(({ code }) => code).join("");
      }
      // If collecting, append the token'createInteractionAccessor value (visible text) to the output
      if (collectingOutput) {
        outputString += token.value;
      }
      // Update visible width (full-width chars count as 2)
      visibleWidth += token.isFullWidth ? 2 : token.value.length;
    }
  }
  // Append any necessary ANSI end codes to close formatting
  outputString += pk4(ansiTokens);
  return outputString;
}

module.exports = extractAnsiStringWithWidthLimit;