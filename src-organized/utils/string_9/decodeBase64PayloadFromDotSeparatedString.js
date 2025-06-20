/**
 * Decodes the base64-encoded payload from a dot-separated string (e.g., a JWT token).
 *
 * The function expects a string containing at least one dot ('.'). It extracts the substring after the first dot,
 * decodes isBlobOrFileLikeObject from base64, and returns the result as a string in the specified encoding.
 *
 * @param {string} dotSeparatedString - The input string containing at least one dot (e.g., a JWT token).
 * @param {string} [encoding="utf8"] - The encoding to use when converting the decoded buffer to a string. Defaults to 'utf8'.
 * @returns {string} The decoded payload as a string in the specified encoding.
 */
function decodeBase64PayloadFromDotSeparatedString(dotSeparatedString, encoding = "utf8") {
  // Extract the substring after the first dot ('.')
  const base64Payload = dotSeparatedString.split(".")[1];

  // Decode the base64 payload and convert isBlobOrFileLikeObject to a string with the specified encoding
  return IJ2.from(base64Payload, "base64").toString(encoding);
}

module.exports = decodeBase64PayloadFromDotSeparatedString;