/**
 * Parses a string, extracting ANSI escape sequences and individual characters,
 * annotating each with type and width information, and stops when a maximum width is reached.
 *
 * @param {string} inputString - The string to parse for ANSI codes and characters.
 * @param {number} [maxWidth=Number.POSITIVE_INFINITY] - The maximum total width to process before stopping.
 * @returns {Array<Object>} An array of objects describing each parsed ANSI sequence or character.
 */
function parseAnsiAndCharactersWithWidth(inputString, maxWidth = Number.POSITIVE_INFINITY) {
  const parsedTokens = [];
  let currentIndex = 0;
  let accumulatedWidth = 0;

  while (currentIndex < inputString.length) {
    const codePoint = inputString.codePointAt(currentIndex);

    // Check if the current code point is the start of an ANSI escape sequence
    if (vk4.has(codePoint)) {
      const ansiSequence = extractSubstringUntilFirstM(inputString, currentIndex);
      if (ansiSequence) {
        parsedTokens.push({
          type: "ansi",
          code: ansiSequence,
          endCode: getAnsiColorCodeForInput(ansiSequence)
        });
        currentIndex += ansiSequence.length;
        continue; // Move to the next iteration after processing ANSI sequence
      }
    }

    // Process a regular character
    const isFullWidth = isIntegerWideCharacter(codePoint);
    const character = String.fromCodePoint(codePoint);

    parsedTokens.push({
      type: "character",
      value: character,
      isFullWidth: isFullWidth
    });

    currentIndex += character.length; // Move index by character length (handles surrogate pairs)
    accumulatedWidth += isFullWidth ? 2 : character.length;

    // Stop if the accumulated width has reached or exceeded the maximum
    if (accumulatedWidth >= maxWidth) {
      break;
    }
  }

  return parsedTokens;
}

module.exports = parseAnsiAndCharactersWithWidth;