/**
 * Validates that a given string is a valid cookie name according to RFC 6265 restrictions.
 * Throws an error if the string contains any invalid characters.
 *
 * @param {string} cookieName - The name of the cookie to validate.
 * @throws {Error} If the cookie name contains invalid characters.
 */
function validateCookieName(cookieName) {
  // List of ASCII codes for characters not allowed in cookie names
  const INVALID_CHAR_CODES = [
    34,  // " (double quote)
    40,  // (
    41,  // )
    44,  // ,
    47,  // /
    58,  // :
    59,  // ;
    60,  // <
    62,  // >
    61,  // =
    63,  // ?
    64,  // @
    91,  // [
    92,  // \
    93,  // ]
    123, // {
    125  // }
  ];

  for (let index = 0; index < cookieName.length; ++index) {
    const charCode = cookieName.charCodeAt(index);
    // Check for ASCII control characters and non-printable characters
    if (charCode < 33 || charCode > 126) {
      throw new Error("Invalid cookie name");
    }
    // Check for explicitly disallowed characters
    if (INVALID_CHAR_CODES.includes(charCode)) {
      throw new Error("Invalid cookie name");
    }
  }
}

module.exports = validateCookieName;