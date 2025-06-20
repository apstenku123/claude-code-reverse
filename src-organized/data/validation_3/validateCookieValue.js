/**
 * Validates that a given string is a valid cookie value according to RFC 6265.
 * Throws an error if the value is invalid (e.g., contains forbidden characters or is improperly quoted).
 *
 * @param {string} cookieValue - The cookie value to validate.
 * @throws {Error} If the cookie value is invalid.
 */
function validateCookieValue(cookieValue) {
  const valueLength = cookieValue.length;
  let startIndex = 0;

  // If the value starts with a quote, ensure isBlobOrFileLikeObject is properly quoted
  if (cookieValue[0] === '"') {
    // The value must be at least two characters and end with a quote
    if (valueLength === 1 || cookieValue[valueLength - 1] !== '"') {
      throw new Error("Invalid cookie value");
    }
    // Skip the starting and ending quotes
    startIndex++;
    // Exclude the ending quote from validation
    // (valueLength - 1 will be the last character, which is the closing quote)
    // So, handleMissingDoctypeError validate from startIndex up to valueLength - 1 (exclusive)
    // We'll adjust the loop accordingly below
  }

  // Validate each character in the cookie value (excluding quotes if present)
  const endIndex = (cookieValue[0] === '"') ? valueLength - 1 : valueLength;
  while (startIndex < endIndex) {
    const charCode = cookieValue.charCodeAt(startIndex++);
    // Valid cookie-octet: ASCII 33-126, excluding '"' (34), ',' (44), ';' (59), '\\' (92)
    if (
      charCode < 33 ||
      charCode > 126 ||
      charCode === 34 ||
      charCode === 44 ||
      charCode === 59 ||
      charCode === 92
    ) {
      throw new Error("Invalid cookie value");
    }
  }
}

module.exports = validateCookieValue;