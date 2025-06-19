/**
 * Parses a string, extracting ANSI escape sequences and character information (including full-width status),
 * up to a specified maximum display width.
 *
 * @param {string} inputString - The string to parse, which may contain ANSI escape codes and Unicode characters.
 * @param {number} [maxDisplayWidth=Number.POSITIVE_INFINITY] - The maximum display width to process (in columns).
 * @returns {Array<Object>} An array of parsed token objects, each representing either an ANSI code or a character.
 */
function parseStringWithAnsiAndFullWidth(inputString, maxDisplayWidth = Number.POSITIVE_INFINITY) {
  const parsedTokens = [];
  let currentIndex = 0;
  let currentDisplayWidth = 0;

  while (currentIndex < inputString.length) {
    const codePoint = inputString.codePointAt(currentIndex);

    // Check if the current code point is the start of an ANSI escape sequence
    if (UI0.has(codePoint)) {
      // Try to extract ANSI escape sequence using extractPrefixedStringWithDelimiter or extractSubstringUpToM
      const ansiSequence = extractPrefixedStringWithDelimiter(inputString, currentIndex) || extractSubstringUpToM(inputString, currentIndex);
      if (ansiSequence) {
        parsedTokens.push({
          type: "ansi",
          code: ansiSequence,
          endCode: resolveAnsiCode(ansiSequence)
        });
        currentIndex += ansiSequence.length;
        continue; // Skip to next iteration after processing ANSI sequence
      }
    }

    // For regular characters, determine if full-width and get string representation
    const isFullWidth = aLike(codePoint);
    const character = String.fromCodePoint(codePoint);

    parsedTokens.push({
      type: "char",
      value: character,
      fullWidth: isFullWidth
    });

    // Advance index by the length of the character (handles surrogate pairs)
    currentIndex += character.length;
    // Update display width: full-width chars count as 2, others as their string length
    currentDisplayWidth += isFullWidth ? 2 : character.length;

    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached or exceeded the maximum display width
    if (currentDisplayWidth >= maxDisplayWidth) {
      break;
    }
  }

  return parsedTokens;
}

module.exports = parseStringWithAnsiAndFullWidth;