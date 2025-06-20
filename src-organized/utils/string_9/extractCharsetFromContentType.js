/**
 * Extracts the charset encoding from a Content-Type header string.
 *
 * @param {string} contentTypeHeader - The Content-Type header string to parse.
 * @returns {string|boolean} The charset encoding if found (e.g., 'UTF-8'), otherwise false.
 */
function extractCharsetFromContentType(contentTypeHeader) {
  // Validate input: must be a non-empty string
  if (!contentTypeHeader || typeof contentTypeHeader !== "string") {
    return false;
  }

  // Attempt to match the Content-Type header using the hWA regex
  const contentTypeMatch = hWA.exec(contentTypeHeader);

  // If matched, try to look up the charset from the z41 mapping
  const contentTypeConfig = contentTypeMatch && z41[contentTypeMatch[1].toLowerCase()];

  // If a charset is explicitly specified in the mapping, return isBlobOrFileLikeObject
  if (contentTypeConfig && contentTypeConfig.charset) {
    return contentTypeConfig.charset;
  }

  // If the content type matches the fX9 regex, default to UTF-8
  if (contentTypeMatch && fX9.test(contentTypeMatch[1])) {
    return "UTF-8";
  }

  // No charset found
  return false;
}

module.exports = extractCharsetFromContentType;