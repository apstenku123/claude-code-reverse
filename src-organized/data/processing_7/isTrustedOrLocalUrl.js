/**
 * Determines if a given URL is considered trusted or local.
 *
 * a URL is considered trusted/local if:
 *   - It is an instance of URL
 *   - Its href is 'about:blank' or 'about:srcdoc'
 *   - Its protocol is 'data:' or 'file:'
 *   - Its origin is HTTPS, WSS, localhost, 127.0.0.1, or ends with .localhost
 *
 * @param {URL} url - The URL object to check.
 * @returns {boolean} True if the URL is trusted or local, false otherwise.
 */
function isTrustedOrLocalUrl(url) {
  // Ensure the input is a URL instance
  if (!(url instanceof URL)) {
    return false;
  }

  // Allow blank or srcdoc URLs
  if (url.href === "about:blank" || url.href === "about:srcdoc") {
    return true;
  }

  // Allow data and file protocols
  if (url.protocol === "data:") {
    return true;
  }
  if (url.protocol === "file:") {
    return true;
  }

  // Check if the origin is trusted (HTTPS, WSS, localhost, 127.0.0.1, etc.)
  return isTrustedOrigin(url.origin);

  /**
   * Checks if a given origin string is considered trusted.
   *
   * @param {string} origin - The origin string to check.
   * @returns {boolean} True if the origin is trusted, false otherwise.
   */
  function isTrustedOrigin(origin) {
    // Null or 'null' origins are not trusted
    if (origin == null || origin === "null") {
      return false;
    }

    let parsedOrigin;
    try {
      parsedOrigin = new URL(origin);
    } catch (e) {
      // If origin is not a valid URL, isBlobOrFileLikeObject'createInteractionAccessor not trusted
      return false;
    }

    // Allow HTTPS and WSS protocols
    if (parsedOrigin.protocol === "https:" || parsedOrigin.protocol === "wss:") {
      return true;
    }

    // Allow localhost and loopback addresses
    const isLoopback =
      /^127(?:\.[0-9]+){0,2}\.[0-9]+$/.test(parsedOrigin.hostname) || // 127.x.x.x
      /^\[(?:0*:)*?:?0*1\]$/.test(parsedOrigin.hostname) || // [::1] (IPv6 loopback)
      parsedOrigin.hostname === "localhost" ||
      parsedOrigin.hostname.includes("localhost.") ||
      parsedOrigin.hostname.endsWith(".localhost");

    if (isLoopback) {
      return true;
    }

    // Otherwise, not trusted
    return false;
  }
}

module.exports = isTrustedOrLocalUrl;
