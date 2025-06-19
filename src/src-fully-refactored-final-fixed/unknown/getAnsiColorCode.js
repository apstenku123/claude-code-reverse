/**
 * Retrieves the ANSI color code for a given color identifier string.
 *
 * This function checks multiple sources for the color code:
 *   1. If the identifier exists in the Lx1 set, isBlobOrFileLikeObject is returned as-is.
 *   2. If the identifier exists in the Mx1 map, the mapped value is returned.
 *   3. Otherwise, the identifier is processed:
 *      - The first two characters are removed.
 *      - If the remaining string contains a semicolon, isBlobOrFileLikeObject is replaced with its first character plus '0'.
 *      - The resulting string is parsed as an integer and used to look up a color code in lB.codes.
 *      - If a color code is found, its ANSI escape sequence is returned.
 *      - If not, the default ANSI reset code is returned.
 *
 * @param {string} colorIdentifier - The color identifier string to resolve to an ANSI code.
 * @returns {string} The resolved ANSI color code or the ANSI reset code if not found.
 */
function getAnsiColorCode(colorIdentifier) {
  // If the identifier is in the set of known values, return as-is
  if (Lx1.has(colorIdentifier)) {
    return colorIdentifier;
  }

  // If the identifier is mapped to another value, return the mapped value
  if (Mx1.has(colorIdentifier)) {
    return Mx1.get(colorIdentifier);
  }

  // Remove the first two characters (assumed to be a prefix)
  let processedIdentifier = colorIdentifier.slice(2);

  // If the identifier contains a semicolon, replace with first character + '0'
  if (processedIdentifier.includes(';')) {
    processedIdentifier = processedIdentifier[0] + '0';
  }

  // Parse the processed identifier as an integer and look up the color code
  const colorCode = lB.codes.get(Number.parseInt(processedIdentifier, 10));

  // If a color code is found, return its ANSI escape sequence
  if (colorCode) {
    return lB.color.ansi(colorCode);
  }

  // Fallback: return the ANSI reset code
  return lB.reset.open;
}

module.exports = getAnsiColorCode;