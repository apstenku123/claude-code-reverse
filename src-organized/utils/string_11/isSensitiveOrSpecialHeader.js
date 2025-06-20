/**
 * Determines if a given header name (as a byte array or similar) matches certain criteria:
 * - Is exactly 'host'
 * - Is a 'content-*' header (if includeContentHeaders is true)
 * - Is a sensitive header (if includeSensitiveHeaders is true): 'authorization', 'cookie', or 'proxy-authorization'
 *
 * @param {Uint8Array|string} headerNameBytes - The header name, typically as a byte array or string.
 * @param {boolean} includeContentHeaders - Whether to match 'content-*' headers.
 * @param {boolean} includeSensitiveHeaders - Whether to match sensitive headers (authorization, cookie, proxy-authorization).
 * @returns {boolean} True if the header matches any of the specified criteria, false otherwise.
 */
function isSensitiveOrSpecialHeader(headerNameBytes, includeContentHeaders, includeSensitiveHeaders) {
  // Convert header name bytes to string using external utility
  const headerName = Vw.headerNameToString(headerNameBytes);

  // Check if header is exactly 'host' (when length is 4)
  if (headerNameBytes.length === 4) {
    return headerName === "host";
  }

  // Check for 'content-*' headers if requested
  if (includeContentHeaders && headerName.startsWith("content-")) {
    return true;
  }

  // Check for sensitive headers if requested and length matches known values
  if (
    includeSensitiveHeaders &&
    (headerNameBytes.length === 13 || headerNameBytes.length === 6 || headerNameBytes.length === 19)
  ) {
    return (
      headerName === "authorization" ||
      headerName === "cookie" ||
      headerName === "proxy-authorization"
    );
  }

  // Does not match any special or sensitive header
  return false;
}

module.exports = isSensitiveOrSpecialHeader;