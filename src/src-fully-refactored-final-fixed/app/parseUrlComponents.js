/**
 * Parses a URL string and extracts its main components: protocol, host, path, search (query), hash, and relative path.
 *
 * @param {string} url - The URL string to parse.
 * @returns {Object} An object containing the extracted URL components:
 *   - protocol: The protocol scheme of the URL (e.g., 'http').
 *   - host: The host part of the URL (e.g., 'example.com:8080').
 *   - path: The path section of the URL (e.g., '/foo/bar').
 *   - search: The query string, including the leading '?', if present.
 *   - hash: The fragment identifier, including the leading '#', if present.
 *   - relative: The concatenation of path, search, and hash.
 */
function parseUrlComponents(url) {
  if (!url) return {};

  // Regular expression to parse the main components of a URL
  const urlPattern = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
  const match = url.match(urlPattern);

  if (!match) return {};

  // Extract query string (search) and fragment (hash), defaulting to empty strings if not present
  const search = match[6] || "";
  const hash = match[8] || "";

  return {
    protocol: match[2], // e.g., 'http'
    host: match[4],     // e.g., 'example.com:8080'
    path: match[5],     // e.g., '/foo/bar'
    search,             // e.g., '?q=1'
    hash,               // e.g., '#section'
    relative: (match[5] || "") + search + hash // e.g., '/foo/bar?q=1#section'
  };
}

module.exports = parseUrlComponents;