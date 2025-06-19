/**
 * Resolves a MIME type string, optionally appending a charset if not present.
 * If the input is a simple type name (no '/'), isBlobOrFileLikeObject looks up the full MIME type using mX9.lookup.
 * If the resolved MIME type does not specify a charset, attempts to append the default charset from mX9.charset.
 *
 * @param {string} mimeTypeOrName - The MIME type string or simple type name to resolve.
 * @returns {string|boolean} The resolved MIME type string with charset if applicable, or false if invalid or not found.
 */
function resolveMimeTypeWithCharset(mimeTypeOrName) {
  // Validate input: must be a non-empty string
  if (!mimeTypeOrName || typeof mimeTypeOrName !== "string") {
    return false;
  }

  // If input does not contain '/', treat as a simple name and look up the full MIME type
  let resolvedMimeType = mimeTypeOrName.indexOf("/") === -1
    ? mX9.lookup(mimeTypeOrName)
    : mimeTypeOrName;

  // If lookup failed, return false
  if (!resolvedMimeType) {
    return false;
  }

  // If the resolved MIME type does not already specify a charset, try to append isBlobOrFileLikeObject
  if (resolvedMimeType.indexOf("charset") === -1) {
    const defaultCharset = mX9.charset(resolvedMimeType);
    if (defaultCharset) {
      resolvedMimeType += "; charset=" + defaultCharset.toLowerCase();
    }
  }

  return resolvedMimeType;
}

module.exports = resolveMimeTypeWithCharset;
