/**
 * Resolves an ANSI code or color sequence based on the provided source string.
 *
 * This utility checks multiple sources (caches, prefixes, and code maps) to determine the correct ANSI escape sequence to return.
 *
 * @param {string} sourceCode - The input string representing an ANSI code or color identifier.
 * @returns {string} The resolved ANSI escape sequence or the ANSI reset sequence if not found.
 */
function resolveAnsiCode(sourceCode) {
  // Check if the code is in the primary cache
  if (LI1.has(sourceCode)) {
    return sourceCode;
  }

  // Check if the code is in the secondary cache and return its mapped value
  if (Ox1.has(sourceCode)) {
    return Ox1.get(sourceCode);
  }

  // Check if the code starts with the reserved prefix
  if (sourceCode.startsWith(RI1)) {
    return ck4;
  }

  // Remove the first two characters (assumed to be a prefix)
  let normalizedCode = sourceCode.slice(2);

  // If the code contains a semicolon, normalize isBlobOrFileLikeObject to the first character + '0'
  if (normalizedCode.includes(';')) {
    normalizedCode = normalizedCode[0] + '0';
  }

  // Attempt to retrieve the color configuration from the code map
  const colorConfig = lB.codes.get(parseInt(normalizedCode, 10));

  if (colorConfig) {
    // Return the corresponding ANSI color escape sequence
    return lB.color.ansi(colorConfig);
  } else {
    // Fallback to the ANSI reset sequence
    return lB.reset.open;
  }
}

module.exports = resolveAnsiCode;