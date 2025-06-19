/**
 * Determines if a given URL is considered trusted based on protocol and hostname.
 *
 * a URL is considered trusted if:
 * - It is an instance of URL
 * - Its href is 'about:blank' or 'about:srcdoc'
 * - Its protocol is 'data:' or 'file:'
 * - Its origin is HTTPS/WSS or localhost/127.0.0.1 variants
 *
 * @param {URL} urlObject - The URL object to check for trustworthiness.
 * @returns {boolean} True if the URL is trusted, false otherwise.
 */
function isTrustedUrl(urlObject) {
  // Ensure the input is a valid URL object
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
   * Checks if a given origin string is trusted (HTTPS/WSS or localhost variants).
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

    // Allow localhost and 127.0.0.1 variants
    const localhostRegex = /^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/;
    if (
      localhostRegex.test(parsedOrigin.hostname) ||
      parsedOrigin.hostname === "localhost" ||
      parsedOrigin.hostname.includes("localhost.") ||
      parsedOrigin.hostname.endsWith(".localhost")
    ) {
      return true;
    }

    // Otherwise, not trusted
    return false;
  }
}

module.exports = isTrustedUrl;