/**
 * Parses a string, extracting ANSI escape sequences and character information, including width.
 *
 * @param {string} inputString - The string to parse, which may contain ANSI escape codes and Unicode characters.
 * @param {number} [maxWidth=Number.POSITIVE_INFINITY] - Optional maximum width (in columns/characters) to process before stopping.
 * @returns {Array<Object>} An array of objects representing parsed ANSI codes and characters, with width information.
 */
function parseStringWithAnsiAndWidth(inputString, maxWidth = Number.POSITIVE_INFINITY) {
  const parsedElements = [];
  let currentIndex = 0;
  let totalWidth = 0;

  while (currentIndex < inputString.length) {
    const codePoint = inputString.codePointAt(currentIndex);

    // Check if the code point is the start of an ANSI escape sequence
    if (vk4.has(codePoint)) {
      const ansiSequence = extractSubstringUntilFirstM(inputString, currentIndex);
      if (ansiSequence) {
        parsedElements.push({
          type: "ansi",
          code: ansiSequence,
          endCode: getAnsiColorCodeForInput(ansiSequence)
        });
        currentIndex += ansiSequence.length;
        continue; // Skip to next iteration after processing ANSI sequence
      }
    }

    // Process a regular character
    const isFullWidth = isIntegerWideCharacter(codePoint);
    const character = String.fromCodePoint(codePoint);
    parsedElements.push({
      type: "character",
      value: character,
      isFullWidth: isFullWidth
    });

    // Advance index by the length of the character (handles surrogate pairs)
    currentIndex += character.length;
    // Increase total width: full-width characters count as 2, others as their string length
    totalWidth += isFullWidth ? 2 : character.length;
    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached or exceeded the maximum allowed width
    if (totalWidth >= maxWidth) break;
  }

  return parsedElements;
}

module.exports = parseStringWithAnsiAndWidth;