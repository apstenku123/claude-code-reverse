/**
 * Determines if two URLs are equivalent based on protocol, port, and hostname (ignoring 'www.').
 * Ignores username and password in the second URL.
 *
 * @param {string} baseUrl - The base URL to compare against.
 * @param {string} compareUrl - The URL to compare.
 * @returns {boolean} True if the URLs are equivalent based on the criteria, false otherwise.
 */
function areUrlsEquivalent(baseUrl, compareUrl) {
  try {
    // Parse both URLs
    const base = new URL(baseUrl);
    const compare = new URL(compareUrl);

    // Protocols must match
    if (compare.protocol !== base.protocol) {
      return false;
    }

    // Ports must match
    if (compare.port !== base.port) {
      return false;
    }

    // Username and password must not be present in the compare URL
    if (compare.username || compare.password) {
      return false;
    }

    /**
     * Helper to remove leading 'www.' from a hostname
     * @param {string} hostname
     * @returns {string}
     */
    const stripWww = (hostname) => hostname.replace(/^www\./, "");

    const baseHostname = stripWww(base.hostname);
    const compareHostname = stripWww(compare.hostname);

    // Hostnames (without 'www.') must match
    return baseHostname === compareHostname;
  } catch (error) {
    // If URL parsing fails, treat as not equivalent
    return false;
  }
}

module.exports = areUrlsEquivalent;