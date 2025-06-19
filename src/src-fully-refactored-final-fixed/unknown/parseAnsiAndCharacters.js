/**
 * Parses a string, extracting ANSI escape sequences and individual characters,
 * and returns an array of token objects describing each segment.
 *
 * @param {string} inputString - The string to parse for ANSI codes and characters.
 * @param {number} [maxDisplayWidth=Number.POSITIVE_INFINITY] - Optional maximum display width (in columns/characters) to process.
 * @returns {Array<Object>} Array of token objects, each representing either an ANSI sequence or a character.
 */
function parseAnsiAndCharacters(inputString, maxDisplayWidth = Number.POSITIVE_INFINITY) {
  /**
   * Array to hold the parsed token objects.
   * Each token is either an ANSI escape sequence or a character.
   */
  const tokens = [];
  // Current index in the input string
  let currentIndex = 0;
  // Accumulated display width (used to respect maxDisplayWidth)
  let displayWidth = 0;

  while (currentIndex < inputString.length) {
    // Get Unicode code point at current index
    const codePoint = inputString.codePointAt(currentIndex);

    // Check if the code point is the start of an ANSI escape sequence
    if (vk4.has(codePoint)) {
      // Attempt to extract the full ANSI sequence starting at currentIndex
      const ansiSequence = extractSubstringUntilM(inputString, currentIndex);
      if (ansiSequence) {
        tokens.push({
          type: "ansi",
          code: ansiSequence,
          endCode: getAnsiColorCodeForInput(ansiSequence)
        });
        // Advance index by the length of the ANSI sequence
        currentIndex += ansiSequence.length;
        continue;
      }
    }

    // Not an ANSI sequence: treat as a regular character
    const isFullWidth = qx1(codePoint); // Determine if the character is full-width
    const character = String.fromCodePoint(codePoint);
    tokens.push({
      type: "character",
      value: character,
      isFullWidth: isFullWidth
    });
    // Advance index by the length of the character (handles surrogate pairs)
    currentIndex += character.length;
    // Increase display width (full-width chars count as 2, others as 1)
    displayWidth += isFullWidth ? 2 : character.length;
    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached or exceeded the maximum display width
    if (displayWidth >= maxDisplayWidth) break;
  }

  return tokens;
}

module.exports = parseAnsiAndCharacters;