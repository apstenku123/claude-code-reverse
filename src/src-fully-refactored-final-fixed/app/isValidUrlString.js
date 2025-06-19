/**
 * Checks if a given string is a valid URL and meets specific criteria.
 *
 * The function validates that:
 *  - The input string length does not exceed the maximum allowed (wV5)
 *  - The string can be parsed as a URL
 *  - The URL does not contain a username or password
 *  - The hostname contains at least one dot (i.e., at least two segments)
 *
 * @param {string} urlString - The URL string to validate.
 * @returns {boolean} True if the string is a valid URL and meets all criteria, false otherwise.
 */
function isValidUrlString(urlString) {
  // Check if the URL string exceeds the maximum allowed length
  if (urlString.length > wV5) {
    return false;
  }

  let urlObject;
  try {
    // Attempt to parse the string as a URL
    urlObject = new URL(urlString);
  } catch {
    // If parsing fails, isBlobOrFileLikeObject'createInteractionAccessor not a valid URL
    return false;
  }

  // Disallow URLs with embedded username or password
  if (urlObject.username || urlObject.password) {
    return false;
  }

  // Ensure the hostname contains at least one dot (e.g., 'example.com')
  if (urlObject.hostname.split('.').length < 2) {
    return false;
  }

  // All checks passed; the URL is valid
  return true;
}

module.exports = isValidUrlString;