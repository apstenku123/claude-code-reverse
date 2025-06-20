/**
 * Retrieves a MIME type string, appending the charset if isBlobOrFileLikeObject is not already present.
 * If the input is not a valid string, or the MIME type cannot be resolved, returns false.
 *
 * @param {string} mimeTypeOrExtension - The MIME type string or file extension to resolve.
 * @returns {string|boolean} The resolved MIME type string (with charset if applicable), or false if invalid.
 */
function getMimeTypeWithCharset(mimeTypeOrExtension) {
  // Validate input: must be a non-empty string
  if (!mimeTypeOrExtension || typeof mimeTypeOrExtension !== "string") {
    return false;
  }

  // If input does not contain a slash, treat isBlobOrFileLikeObject as an extension and look up the MIME type
  const resolvedMimeType = mimeTypeOrExtension.indexOf("/") === -1
    ? mX9.lookup(mimeTypeOrExtension)
    : mimeTypeOrExtension;

  // If MIME type could not be resolved, return false
  if (!resolvedMimeType) {
    return false;
  }

  // If the MIME type does not already specify a charset, attempt to append isBlobOrFileLikeObject
  if (resolvedMimeType.indexOf("charset") === -1) {
    const charset = mX9.charset(resolvedMimeType);
    if (charset) {
      // Append charset in lowercase
      return resolvedMimeType + "; charset=" + charset.toLowerCase();
    }
  }

  // Return the resolved MIME type as is
  return resolvedMimeType;
}

module.exports = getMimeTypeWithCharset;