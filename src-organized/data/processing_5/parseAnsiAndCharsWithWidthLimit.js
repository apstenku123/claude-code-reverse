/**
 * Parses a string, extracting ANSI escape sequences and Unicode characters,
 * tracking their display width, and stopping when a width limit is reached.
 *
 * @param {string} inputString - The string to parse for ANSI codes and characters.
 * @param {number} [maxDisplayWidth=Number.POSITIVE_INFINITY] - Optional maximum display width to process.
 * @returns {Array<Object>} An array of objects representing parsed ANSI codes and characters, including width info.
 */
function parseAnsiAndCharsWithWidthLimit(inputString, maxDisplayWidth = Number.POSITIVE_INFINITY) {
  /**
   * The result array containing parsed tokens (either ANSI codes or characters).
   * Each token is an object describing its type and relevant properties.
   */
  const parsedTokens = [];

  // Current index in the input string
  let currentIndex = 0;
  // Accumulated display width
  let currentDisplayWidth = 0;

  while (currentIndex < inputString.length) {
    // Get Unicode code point at the current index
    const codePoint = inputString.codePointAt(currentIndex);

    // Check if the code point is the start of an ANSI escape sequence
    if (UI0.has(codePoint)) {
      // Try to extract an ANSI code sequence at this position
      const ansiCode = extractPrefixedStringWithDelimiter(inputString, currentIndex) || extractSubstringUpToM(inputString, currentIndex);
      if (ansiCode) {
        parsedTokens.push({
          type: "ansi",
          code: ansiCode,
          endCode: resolveAnsiCode(ansiCode)
        });
        // Advance index by the length of the ANSI code sequence
        currentIndex += ansiCode.length;
        continue;
      }
    }

    // Determine if the character is full-width (double-width)
    const isFullWidth = aLike(codePoint);
    // Get the character as a string
    const char = String.fromCodePoint(codePoint);

    parsedTokens.push({
      type: "char",
      value: char,
      fullWidth: isFullWidth
    });
    // Advance index by the character'createInteractionAccessor length (handles surrogate pairs)
    currentIndex += char.length;
    // Add to the display width (2 for full-width, 1 for normal)
    currentDisplayWidth += isFullWidth ? 2 : char.length;

    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached or exceeded the maximum display width
    if (currentDisplayWidth >= maxDisplayWidth) break;
  }

  return parsedTokens;
}

module.exports = parseAnsiAndCharsWithWidthLimit;