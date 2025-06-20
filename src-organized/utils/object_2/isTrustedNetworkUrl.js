/**
 * Determines if a given URL is considered a 'trusted' network URL.
 *
 * a URL is considered trusted if:
 *   - It is an instance of URL
 *   - Its href is 'about:blank' or 'about:srcdoc'
 *   - Its protocol is 'data:' or 'file:'
 *   - Its origin is HTTPS, WSS, localhost, or a localhost variant
 *
 * @param {URL} urlObject - The URL object to check for trustworthiness.
 * @returns {boolean} True if the URL is trusted, false otherwise.
 */
function isTrustedNetworkUrl(urlObject) {
  // Ensure the input is a valid URL instance
  if (!(urlObject instanceof URL)) {
    return false;
  }

  // Allow blank and srcdoc URLs
  if (urlObject.href === "about:blank" || urlObject.href === "about:srcdoc") {
    return true;
  }

  // Allow data and file protocols
  if (urlObject.protocol === "data:") {
    return true;
  }
  if (urlObject.protocol === "file:") {
    return true;
  }

  // Check if the origin is trusted
  return isTrustedOrigin(urlObject.origin);

  /**
   * Determines if a given origin string is considered trusted.
   *
   * @param {string} origin - The origin string (e.g., 'https://example.com').
   * @returns {boolean} True if the origin is trusted, false otherwise.
   */
  function isTrustedOrigin(origin) {
    // Null or 'null' origins are not trusted
    if (origin == null || origin === "null") {
      return false;
    }

    const originUrl = new URL(origin);

    // Allow HTTPS and WSS protocols
    if (originUrl.protocol === "https:" || originUrl.protocol === "wss:") {
      return true;
    }

    // Allow localhost and 127.0.0.1 variants (IPv4 and IPv6)
    const isLocalhost =
      /^127(?:\.[0-9]+){0,2}\.[0-9]+$/.test(originUrl.hostname) || // 127.x.x.x IPv4
      originUrl.hostname === "localhost" ||
      originUrl.hostname.includes("localhost.") ||
      originUrl.hostname.endsWith(".localhost") ||
      /^\[(?:0*:)*?:?0*1\]$/.test(originUrl.hostname); // IPv6 ::1

    if (isLocalhost) {
      return true;
    }

    // Otherwise, not trusted
    return false;
  }
}

module.exports = isTrustedNetworkUrl;
