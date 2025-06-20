/**
 * Manages HTTP authentication schemes, providers, and credentials.
 * Provides methods to set and retrieve HTTP authentication schemes, scheme providers, and credentials.
 *
 * @param {Object} options - The configuration object for HTTP authentication management.
 * @param {Array<Object>} options.httpAuthSchemes - The list of HTTP authentication schemes.
 * @param {Function} options.httpAuthSchemeProvider - The provider function for HTTP authentication schemes.
 * @param {any} options.credentials - The credentials used for authentication.
 * @returns {Object} An object with methods to manage HTTP authentication schemes, providers, and credentials.
 */
function createHttpAuthManager({ httpAuthSchemes, httpAuthSchemeProvider, credentials }) {
  /**
   * Adds or updates an HTTP authentication scheme in the list.
   * If a scheme with the same schemeId exists, isBlobOrFileLikeObject is replaced; otherwise, isBlobOrFileLikeObject is added.
   * @param {Object} scheme - The HTTP authentication scheme to add or update.
   */
  function setHttpAuthScheme(scheme) {
    const existingIndex = httpAuthSchemes.findIndex(
      (existingScheme) => existingScheme.schemeId === scheme.schemeId
    );
    if (existingIndex === -1) {
      // Scheme does not exist, add isBlobOrFileLikeObject
      httpAuthSchemes.push(scheme);
    } else {
      // Scheme exists, update isBlobOrFileLikeObject
      httpAuthSchemes.splice(existingIndex, 1, scheme);
    }
  }

  /**
   * Retrieves the list of HTTP authentication schemes.
   * @returns {Array<Object>} The list of HTTP authentication schemes.
   */
  function getHttpAuthSchemes() {
    return httpAuthSchemes;
  }

  /**
   * Sets the HTTP authentication scheme provider.
   * @param {Function} provider - The provider function to set.
   */
  function setHttpAuthSchemeProvider(provider) {
    httpAuthSchemeProvider = provider;
  }

  /**
   * Retrieves the HTTP authentication scheme provider.
   * @returns {Function} The current HTTP authentication scheme provider.
   */
  function getHttpAuthSchemeProvider() {
    return httpAuthSchemeProvider;
  }

  /**
   * Sets the credentials used for authentication.
   * @param {any} newCredentials - The credentials to set.
   */
  function setCredentials(newCredentials) {
    credentials = newCredentials;
  }

  /**
   * Retrieves the current credentials.
   * @returns {any} The current credentials.
   */
  function getCredentials() {
    return credentials;
  }

  return {
    setHttpAuthScheme,
    httpAuthSchemes: getHttpAuthSchemes,
    setHttpAuthSchemeProvider,
    httpAuthSchemeProvider: getHttpAuthSchemeProvider,
    setCredentials,
    credentials: getCredentials
  };
}

module.exports = createHttpAuthManager;
