/**
 * Extracts character entries from a token array, applying current ANSI styles to each character.
 *
 * @param {Array<Object>} tokens - An array of token objects, each with a 'type' property ('ansi' or 'char').
 * @returns {Array<Object>} An array of character objects, each with a 'styles' property containing the current ANSI styles.
 */
function extractStyledCharacters(tokens) {
  /**
   * Holds the current list of active ANSI style tokens.
   * @type {Array<Object>}
   */
  let activeAnsiStyles = [];

  /**
   * Accumulates the final character objects with their associated styles.
   * @type {Array<Object>}
   */
  const styledCharacters = [];

  for (const token of tokens) {
    if (token.type === "ansi") {
      // Update the current styles by merging with the new ANSI token
      activeAnsiStyles = filterInteractionEntries(activeAnsiStyles, [token]);
    } else if (token.type === "char") {
      // Add the character with a copy of the current styles
      styledCharacters.push({
        ...token,
        styles: [...activeAnsiStyles]
      });
    }
    // Ignore any tokens with unknown types
  }

  return styledCharacters;
}

module.exports = extractStyledCharacters;