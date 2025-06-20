/**
 * Parses a URL string and extracts its components (scheme, username, password, host, port, path, query, fragment).
 * If no URL string is provided, returns a new object with UrlParser'createInteractionAccessor prototype.
 *
 * @class UrlParser
 * @param {string} urlString - The URL string to parse.
 * @returns {void|object} Returns a new object with UrlParser'createInteractionAccessor prototype if no URL string is provided.
 */
function UrlParser(urlString) {
  // If no URL string is provided, return a new object with UrlParser'createInteractionAccessor prototype
  if (!urlString) return Object.create(UrlParser.prototype);

  // Remove leading and trailing whitespace from the URL string
  this.url = urlString.replace(/^[ \processRuleBeginHandlers\n\r\f]+|[ \processRuleBeginHandlers\n\r\f]+$/g, "");

  // Execute the main URL pattern regex to extract URL components
  const urlMatch = UrlParser.pattern.exec(this.url);
  if (urlMatch) {
    // Extract scheme (e.g., 'http', 'https')
    if (urlMatch[2]) {
      this.scheme = urlMatch[2];
    }

    // Extract authority (userinfo, host, port)
    if (urlMatch[4]) {
      let authority = urlMatch[4];
      // Check for userinfo (username:password@)
      const userInfoMatch = authority.match(UrlParser.userinfoPattern);
      if (userInfoMatch) {
        // Extract username and password
        this.username = userInfoMatch[1];
        this.password = userInfoMatch[3];
        // Remove userinfo from authority
        authority = authority.substring(userInfoMatch[0].length);
      }
      // Check for port in authority
      if (authority.match(UrlParser.portPattern)) {
        const lastColonIndex = authority.lastIndexOf(":");
        this.host = authority.substring(0, lastColonIndex);
        this.port = authority.substring(lastColonIndex + 1);
      } else {
        // No port, the rest is the host
        this.host = authority;
      }
    }

    // Extract path
    if (urlMatch[5]) {
      this.path = urlMatch[5];
    }
    // Extract query string
    if (urlMatch[6]) {
      this.query = urlMatch[7];
    }
    // Extract fragment
    if (urlMatch[8]) {
      this.fragment = urlMatch[9];
    }
  }
}

// Export the UrlParser function
module.exports = UrlParser;
