/**
 * Checks if the provided headers object contains the 'Proxy-Authorization' header (case-insensitive).
 * Throws an error if the header is found, instructing the user to use the ProxyAgent constructor instead.
 *
 * @param {Object} headers - An object representing HTTP headers.
 * @throws {wY1} Throws an error if 'Proxy-Authorization' header is present.
 */
function validateNoProxyAuthorizationHeader(headers) {
  if (
    headers &&
    Object.keys(headers).find(
      (headerName) => headerName.toLowerCase() === "proxy-authorization"
    )
  ) {
    // If 'Proxy-Authorization' header is found, throw an error
    throw new wY1(
      "Proxy-Authorization should be sent in ProxyAgent constructor"
    );
  }
}

module.exports = validateNoProxyAuthorizationHeader;