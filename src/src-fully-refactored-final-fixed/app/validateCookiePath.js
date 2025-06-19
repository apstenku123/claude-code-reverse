/**
 * Validates that a given cookie path string contains only allowed ASCII characters.
 * Throws an error if the path contains any control characters (ASCII < 32),
 * the DEL character (ASCII 127), or a semicolon (ASCII 59), as these are not allowed in cookie paths.
 *
 * @param {string} cookiePath - The cookie path string to validate.
 * @throws {Error} If the cookie path contains invalid characters.
 */
function validateCookiePath(cookiePath) {
  for (let charIndex = 0; charIndex < cookiePath.length; ++charIndex) {
    const charCode = cookiePath.charCodeAt(charIndex);
    // Disallow ASCII control characters (<32), DEL (127), and semicolon (59)
    if (charCode < 32 || charCode === 127 || charCode === 59) {
      throw new Error("Invalid cookie path");
    }
  }
}

module.exports = validateCookiePath;
