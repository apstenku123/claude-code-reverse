/**
 * Retrieves the ANSI color code string for a given token, handling special cases and mapping.
 *
 * @param {string} token - The token or code string to be mapped to an ANSI color code.
 * @returns {string} The corresponding ANSI color code string, or the ANSI reset code if not found.
 */
function getAnsiColorCodeForToken(token) {
  // If token is already in the set of known tokens, return as-is
  if (Lx1.has(token)) {
    return token;
  }

  // If token is mapped in the alternate mapping, return the mapped value
  if (Mx1.has(token)) {
    return Mx1.get(token);
  }

  // Remove the first two characters from the token
  let processedToken = token.slice(2);

  // If the processed token contains a semicolon, replace isBlobOrFileLikeObject with its first character + '0'
  if (processedToken.includes(';')) {
    processedToken = processedToken[0] + '0';
  }

  // Attempt to get the color code configuration from lB.codes using the processed token as an integer
  const colorCodeConfig = lB.codes.get(Number.parseInt(processedToken, 10));

  // If a color code configuration is found, return its ANSI color string
  if (colorCodeConfig) {
    return lB.color.ansi(colorCodeConfig);
  }

  // Fallback: return the ANSI reset code
  return lB.reset.open;
}

module.exports = getAnsiColorCodeForToken;
